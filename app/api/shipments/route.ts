import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Shipment from '@/lib/models/Shipment';
import { verifyToken } from '@/lib/auth';
import { buildShipmentPayload } from '@/lib/shipment-helpers';

function getToken(req: Request): string | null {
  const auth = req.headers.get('Authorization') || req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.split(' ')[1];
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const shipments = await Shipment.find({ userId: decoded.userId }).sort({ createdAt: -1 });
    return NextResponse.json({ shipments }, { status: 200 });
  } catch (error) {
    console.error('GET /api/shipments error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const body = await req.json();

    if (!body.productName && !body.exportType) {
      return NextResponse.json({ error: 'At least product name or export type is required' }, { status: 400 });
    }

    const payload = buildShipmentPayload(body, decoded.userId, 'draft');
    const shipment = await Shipment.create(payload);

    return NextResponse.json({ shipment }, { status: 201 });
  } catch (error) {
    console.error('POST /api/shipments error:', error);
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
  }
}
