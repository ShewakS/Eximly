import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Document from '@/lib/models/Document';
import Shipment from '@/lib/models/Shipment';
import { adminMiddleware } from '@/lib/middleware';
import { REQUIRED_DOCUMENT_TYPES } from '@/lib/shipment-helpers';

async function syncShipmentDocumentStatus(shipmentId: string) {
  const docs = await Document.find({
    shipment: shipmentId,
    documentType: { $in: REQUIRED_DOCUMENT_TYPES },
  });

  if (docs.length === 0) return;

  const hasRejected = docs.some((d) => d.status === 'rejected');
  const allVerified = docs.length >= REQUIRED_DOCUMENT_TYPES.length && docs.every((d) => d.status === 'verified');

  if (hasRejected) {
    const rejectedDoc = docs.find((d) => d.status === 'rejected');
    await Shipment.findByIdAndUpdate(shipmentId, {
      status: 'documents_rejected',
      documentVerificationStatus: 'rejected',
      rejectionReason: rejectedDoc?.rejectionReason || 'One or more documents were rejected',
    });
  } else if (allVerified) {
    await Shipment.findByIdAndUpdate(shipmentId, {
      status: 'pending',
      documentVerificationStatus: 'approved',
      rejectionReason: '',
    });
  } else {
    await Shipment.findByIdAndUpdate(shipmentId, {
      documentVerificationStatus: 'pending',
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) return authResult;

    const documents = await Document.find({})
      .populate('user', 'firstName lastName email')
      .populate('shipment', 'exportType sourceCountry destinationCountry productName status documentVerificationStatus')
      .populate('verifiedBy', 'firstName lastName')
      .sort({ uploadedAt: -1 });

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) return authResult;

    const { documentId, status, rejectionReason } = await request.json();

    if (!documentId || !status) {
      return NextResponse.json({ error: 'Document ID and status are required' }, { status: 400 });
    }

    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    if (status === 'rejected' && !rejectionReason?.trim()) {
      return NextResponse.json({ error: 'Rejection reason is required when rejecting a document' }, { status: 400 });
    }

    const payload = authResult as { userId: string };
    const document = await Document.findByIdAndUpdate(
      documentId,
      {
        status,
        verifiedBy: payload.userId,
        rejectionReason: status === 'rejected' ? rejectionReason : '',
      },
      { new: true }
    )
      .populate('user', 'firstName lastName email')
      .populate('shipment', 'exportType sourceCountry destinationCountry productName status')
      .populate('verifiedBy', 'firstName lastName');

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    await syncShipmentDocumentStatus(document.shipment.toString());

    return NextResponse.json({ document }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
