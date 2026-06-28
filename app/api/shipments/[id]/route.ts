import { connectDB } from '@/lib/db';
import Shipment from '@/lib/models/Shipment';
import Document from '@/lib/models/Document';
import { verifyToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { pickAllowedUpdates, buildShipmentPayload } from '@/lib/shipment-helpers';

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.replace('Bearer ', '');
}

async function getOwnedShipment(id: string, userId: string) {
  const shipment = await Shipment.findById(id);
  if (!shipment) return { error: NextResponse.json({ error: 'Shipment not found' }, { status: 404 }) };
  if (shipment.userId.toString() !== userId) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 403 }) };
  }
  return { shipment };
}

export async function GET(
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

    const result = await getOwnedShipment(id, decoded.userId);
    if ('error' in result && result.error) return result.error;

    const documents = await Document.find({ shipment: id }).sort({ uploadedAt: -1 });

    return NextResponse.json({ shipment: result.shipment, documents }, { status: 200 });
  } catch (error) {
    console.error('GET /api/shipments/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
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

    const result = await getOwnedShipment(id, decoded.userId);
    if ('error' in result && result.error) return result.error;

    const body = await req.json();
    const updates = pickAllowedUpdates(body);

    if (body.productValue !== undefined || body.estimatedWeight !== undefined || body.exportType) {
      const merged = { ...result.shipment!.toObject(), ...updates };
      const costs = buildShipmentPayload(merged, decoded.userId, 'draft');
      updates.estimatedShippingCost = costs.estimatedShippingCost;
      updates.estimatedTaxes = costs.estimatedTaxes;
    }

    const updated = await Shipment.findByIdAndUpdate(id, updates, { new: true });

    return NextResponse.json({ message: 'Shipment updated', shipment: updated }, { status: 200 });
  } catch (error) {
    console.error('PUT /api/shipments/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
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

    const result = await getOwnedShipment(id, decoded.userId);
    if ('error' in result && result.error) return result.error;

    await Document.deleteMany({ shipment: id });
    await Shipment.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Shipment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/shipments/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
