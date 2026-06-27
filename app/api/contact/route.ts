import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/lib/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    return NextResponse.json(
      { message: 'Your message has been received. We\'ll get back to you soon!' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message. Please try again.' },
      { status: 500 }
    );
  }
}
