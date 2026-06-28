'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ExportTypePage() {
  const params = useParams();
  const router = useRouter();
  const exportType = params.type as string;

  useEffect(() => {
    // Redirect to the main export form with the type pre-selected
    if (exportType === 'domestic' || exportType === 'international') {
      router.push(`/export/form?type=${exportType}`);
    } else {
      router.push('/export/form');
    }
  }, [exportType, router]);

  return (
    <div className="min-h-screen auth-bg-gradient section-padding">
      <div className="container-max">
        <div className="card max-w-md mx-auto text-center">
          <p className="text-neutral-gray">Redirecting to export form...</p>
        </div>
      </div>
    </div>
  );
}
