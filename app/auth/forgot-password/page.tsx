'use client';

import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-light to-white section-padding">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-8 text-neutral-dark">Forgot Password</h1>
          <p className="text-neutral-gray text-center mb-6">
            This feature will be available soon. Please contact support at info@eximly.com
          </p>
          <Link href="/" className="btn-primary block text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
