'use client';

import { Suspense } from 'react';
import ShipmentWizard from '@/components/export/ShipmentWizard';

function WizardFallback() {
  return (
    <div className="min-h-screen bg-neutral-lightGray flex items-center justify-center">
      <p className="text-neutral-gray">Loading shipment form...</p>
    </div>
  );
}

export default function ExportFormPage() {
  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<WizardFallback />}>
          <ShipmentWizard />
        </Suspense>
      </div>
    </div>
  );
}
