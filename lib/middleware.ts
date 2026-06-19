import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';
import User from './models/User';
import { connectDB } from './db';

export async function authMiddleware(request: NextRequest) {
  const authHeader =
    request.headers.get('authorization') || request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '') || request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return payload;
}

export async function adminMiddleware(request: NextRequest) {
  const payload = await authMiddleware(request);

  if (payload instanceof NextResponse) {
    return payload;
  }

  await connectDB();
  const user = await User.findById(payload.userId).select('role');
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
  }

  return payload;
}
