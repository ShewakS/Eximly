import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Shipment from '@/lib/models/Shipment';
import { adminMiddleware } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) return authResult;

    const shipments = await Shipment.find({})
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ shipments }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/admin/shipments error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) return authResult;

    const { shipmentId, status } = await request.json();

    if (!shipmentId || !status) {
      return NextResponse.json({ error: 'Shipment ID and status are required' }, { status: 400 });
    }

    if (!['pending', 'in_transit', 'delivered'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const shipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      { status },
      { new: true }
    ).populate('userId', 'firstName lastName email');

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json({ shipment }, { status: 200 });
  } catch (error: any) {
    console.error('PATCH /api/admin/shipments error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
