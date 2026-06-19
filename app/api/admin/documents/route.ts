import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Document from '@/lib/models/Document';
import { adminMiddleware } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const documents = await Document.find({})
      .populate('user', 'firstName lastName email')
      .populate('shipment', 'exportType originCountry destinationCountry')
      .populate('verifiedBy', 'firstName lastName')
      .sort({ uploadedAt: -1 });

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { documentId, status } = await request.json();

    if (!documentId || !status) {
      return NextResponse.json({ error: 'Document ID and status are required' }, { status: 400 });
    }

    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const payload = authResult as { userId: string };
    const document = await Document.findByIdAndUpdate(
      documentId,
      { status, verifiedBy: payload.userId },
      { new: true }
    )
      .populate('user', 'firstName lastName email')
      .populate('shipment', 'exportType originCountry destinationCountry')
      .populate('verifiedBy', 'firstName lastName');

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ document }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
