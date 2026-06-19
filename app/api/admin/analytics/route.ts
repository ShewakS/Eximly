import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import Shipment from '@/lib/models/Shipment';
import Order from '@/lib/models/Order';
import Document from '@/lib/models/Document';
import { adminMiddleware } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authResult = await adminMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalShipments = await Shipment.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalDocuments = await Document.countDocuments();

    const pendingShipments = await Shipment.countDocuments({ status: 'pending' });
    const inTransitShipments = await Shipment.countDocuments({ status: 'in_transit' });
    const deliveredShipments = await Shipment.countDocuments({ status: 'delivered' });

    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

    const pendingDocuments = await Document.countDocuments({ status: 'pending' });
    const verifiedDocuments = await Document.countDocuments({ status: 'verified' });
    const rejectedDocuments = await Document.countDocuments({ status: 'rejected' });

    return NextResponse.json({
      users: {
        total: totalUsers,
        admins: totalAdmins,
      },
      shipments: {
        total: totalShipments,
        pending: pendingShipments,
        inTransit: inTransitShipments,
        delivered: deliveredShipments,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders,
      },
      documents: {
        total: totalDocuments,
        pending: pendingDocuments,
        verified: verifiedDocuments,
        rejected: rejectedDocuments,
      },
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
