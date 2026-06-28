import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Shipment from '@/lib/models/Shipment';
import Document from '@/lib/models/Document';
import { verifyToken } from '@/lib/auth';
import { Types } from 'mongoose';
import { REQUIRED_DOCUMENT_TYPES } from '@/lib/shipment-helpers';

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.replace('Bearer ', '');
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid shipment ID' }, { status: 400 });
    }

    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    if (shipment.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const isInternational = shipment.exportType === 'international';

    if (isInternational) {
      const requiredFields = [
        'productName', 'productCategory', 'quantity', 'productValue',
        'sourceCountry', 'sourceCity', 'destinationCountry', 'destinationCity',
        'exporterName', 'companyName', 'businessRegistrationNumber', 'contactNumber', 'email',
        'passportNumber', 'exportLicenseNumber', 'customerDeclarationNumber',
        'shippingMethod', 'estimatedWeight', 'expectedDeliveryDate', 'hsCode', 'purpose',
      ];
      const missingFields = requiredFields.filter((f) => !shipment.get(f));
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Please complete all required fields before submitting: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }

      const docs = await Document.find({ shipment: id });
      const uploadedTypes = new Set(docs.map((d) => d.documentType));
      const missingDocs = REQUIRED_DOCUMENT_TYPES.filter((t) => !uploadedTypes.has(t));
      if (missingDocs.length > 0) {
        return NextResponse.json(
          { error: `Missing required document uploads: ${missingDocs.join(', ')}` },
          { status: 400 }
        );
      }
    } else {
      const requiredFields = [
        'productName', 'productCategory', 'quantity', 'productValue',
        'sourceCountry', 'sourceCity', 'destinationCountry', 'destinationCity',
        'shippingMethod', 'pickupDate',
      ];
      const missingFields = requiredFields.filter((f) => !shipment.get(f));
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Please complete all required fields: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const newStatus = isInternational ? 'pending_review' : 'pending';
    const docStatus = isInternational ? 'pending' : 'not_required';

    const updated = await Shipment.findByIdAndUpdate(
      id,
      {
        status: newStatus,
        documentVerificationStatus: docStatus,
        currentStep: 8,
        rejectionReason: '',
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: isInternational
          ? 'Shipment submitted for document review'
          : 'Shipment submitted successfully',
        shipment: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/shipments/[id]/submit error:', error);
    return NextResponse.json({ error: 'Failed to submit shipment' }, { status: 500 });
  }
}
