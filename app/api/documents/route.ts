import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Document from '@/lib/models/Document';
import Shipment from '@/lib/models/Shipment';
import { verifyToken } from '@/lib/auth';
import { saveUploadFile, validateUploadFile } from '@/lib/upload';
import { Types } from 'mongoose';

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.replace('Bearer ', '');
}

const VALID_TYPES = ['passport_copy', 'export_license_copy', 'declaration_document'];

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const shipmentId = req.nextUrl.searchParams.get('shipmentId');
    if (!shipmentId || !Types.ObjectId.isValid(shipmentId)) {
      return NextResponse.json({ error: 'Valid shipmentId is required' }, { status: 400 });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment || shipment.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    const documents = await Document.find({ shipment: shipmentId }).sort({ uploadedAt: -1 });
    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    console.error('GET /api/documents error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const shipmentId = formData.get('shipmentId') as string | null;
    const documentType = formData.get('documentType') as string | null;

    if (!file || !shipmentId || !documentType) {
      return NextResponse.json({ error: 'file, shipmentId, and documentType are required' }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(shipmentId)) {
      return NextResponse.json({ error: 'Invalid shipment ID' }, { status: 400 });
    }

    if (!VALID_TYPES.includes(documentType)) {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
    }

    const validationError = validateUploadFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment || shipment.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    const { fileUrl, fileName } = await saveUploadFile(file, shipmentId, documentType);

    // Replace existing document of same type
    await Document.deleteMany({ shipment: shipmentId, documentType });

    const document = await Document.create({
      user: decoded.userId,
      shipment: shipmentId,
      documentType,
      fileUrl,
      fileName,
      mimeType: file.type,
      status: 'pending',
      rejectionReason: '',
    });

    // Reset shipment doc status if re-uploading after rejection
    if (shipment.status === 'documents_rejected') {
      await Shipment.findByIdAndUpdate(shipmentId, {
        status: 'pending_review',
        documentVerificationStatus: 'pending',
        rejectionReason: '',
      });
    }

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error('POST /api/documents error:', error);
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 });
  }
}
