'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardSectionPage() {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;

  useEffect(() => {
    // For now, redirect to main dashboard
    // In the future, this could handle different dashboard sections like:
    // - shipments
    // - analytics
    // - settings
    // - etc.
    router.push('/dashboard');
  }, [section, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-light to-white section-padding">
      <div className="container-max">
        <div className="card max-w-md mx-auto text-center">
          <p className="text-neutral-gray">Loading dashboard section...</p>
        </div>
      </div>
    </div>
  );
}
