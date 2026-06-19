import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';
import { adminMiddleware } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const orders = await Order.find({})
      .populate('user', 'firstName lastName email')
      .populate('products.productId', 'name category price')
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
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

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Order ID and status are required' }, { status: 400 });
    }

    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate('user', 'firstName lastName email')
      .populate('products.productId', 'name category price');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
