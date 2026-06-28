'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  INITIAL_SHIPMENT_FORM,
  CURRENCY_OPTIONS,
  UNIT_OPTIONS,
  type ShipmentFormData,
  type ExportType,
} from '@/lib/types/shipment';
import { validateStep } from '@/lib/shipment-helpers';
import { estimateShipmentCosts } from '@/lib/shipment-pricing';

const STEP_LABELS = [
  'Product Details',
  'Shipment Route',
  'Shipment Type',
  'Exporter Info',
  'Export Documents',
  'Shipping Info',
  'Customs',
  'Review',
];

interface UploadedDoc {
  documentType: string;
  fileName: string;
  fileUrl: string;
  status: string;
}

function getVisibleSteps(exportType: ExportType): number[] {
  if (exportType === 'domestic') return [1, 2, 3, 8];
  return [1, 2, 3, 4, 5, 6, 7, 8];
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
}

export default function ShipmentWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<ShipmentFormData>(INITIAL_SHIPMENT_FORM);
  const [shipmentId, setShipmentId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/auth/login');

    const typeParam = searchParams.get('type');
    if (typeParam === 'domestic' || typeParam === 'international') {
      setForm((f) => ({ ...f, exportType: typeParam }));
    }
  }, [router, searchParams]);

  const visibleSteps = getVisibleSteps(form.exportType);
  const stepIndex = visibleSteps.indexOf(currentStep);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === visibleSteps.length - 1;

  const update = (field: keyof ShipmentFormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const getToken = () => localStorage.getItem('token');

  const saveDraft = useCallback(async (): Promise<string | null> => {
    const token = getToken();
    if (!token) return null;

    const payload = { ...form, currentStep };

    if (shipmentId) {
      const res = await fetch(`/api/shipments/${shipmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save shipment');
      }
      const data = await res.json();
      return data.shipment._id;
    }

    const res = await fetch('/api/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create shipment');
    }
    const data = await res.json();
    setShipmentId(data.shipment._id);
    return data.shipment._id;
  }, [form, currentStep, shipmentId]);

  const fetchDocuments = async (id: string) => {
    const token = getToken();
    const res = await fetch(`/api/documents?shipmentId=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setDocuments(data.documents);
    }
  };

  const handleUpload = async (documentType: string, file: File) => {
    setUploading(documentType);
    setError('');
    try {
      let id = shipmentId;
      if (!id) {
        id = await saveDraft();
        if (!id) throw new Error('Could not create shipment draft');
        setShipmentId(id);
      }

      const token = getToken();
      const fd = new FormData();
      fd.append('file', file);
      fd.append('shipmentId', id);
      fd.append('documentType', documentType);

      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }
      await fetchDocuments(id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const handleNext = async () => {
    setError('');
    const validationError = validateStep(currentStep, form, form.exportType);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await saveDraft();
      if (currentStep === 5 && shipmentId) {
        await fetchDocuments(shipmentId);
      }
      const nextStep = visibleSteps[stepIndex + 1];
      setCurrentStep(nextStep);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError('');
    const prevStep = visibleSteps[stepIndex - 1];
    setCurrentStep(prevStep);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      let id = shipmentId;
      if (!id) {
        id = await saveDraft();
        if (!id) throw new Error('Could not save shipment');
      }

      const token = getToken();
      const res = await fetch(`/api/shipments/${id}/submit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit shipment');
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submit failed');
    } finally {
      setLoading(false);
    }
  };

  const costs = estimateShipmentCosts({
    exportType: form.exportType,
    shippingMethod: form.shippingMethod,
    estimatedWeight: Number(form.estimatedWeight) || Number(form.quantity) || 1,
    productValue: Number(form.productValue) || 0,
    insuranceRequired: form.insuranceRequired,
    sourceCountry: form.sourceCountry,
    destinationCountry: form.destinationCountry,
  });

  const getDoc = (type: string) => documents.find((d) => d.documentType === type);

  return (
    <div className="wizard-container">
      <div className="card wizard-card">
        <h1 className="wizard-title">Create New Shipment</h1>
        <p className="wizard-subtitle">Complete all steps to submit your export shipment</p>

        {/* Step indicator */}
        <div className="wizard-steps">
          {visibleSteps.map((step, i) => (
            <div
              key={step}
              className={`wizard-step-item ${step === currentStep ? 'wizard-step-active' : ''} ${step < currentStep ? 'wizard-step-done' : ''}`}
            >
              <span className="wizard-step-num">{i + 1}</span>
              <span className="wizard-step-label">{STEP_LABELS[step - 1]}</span>
            </div>
          ))}
        </div>

        {error && <div className="auth-error-box">{error}</div>}

        {/* Step 1 – Product Details */}
        {currentStep === 1 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 1 – Shipment Details</h2>
            <p className="text-sm text-neutral-gray mb-4">Basic shipment information</p>
            <div className="grid-responsive-3">
              <div>
                <label className="auth-label">Product Name *</label>
                <input value={form.productName} onChange={(e) => update('productName', e.target.value)} placeholder="e.g. Organic Coffee Beans" required />
              </div>
              <div>
                <label className="auth-label">Product Category *</label>
                <input value={form.productCategory} onChange={(e) => update('productCategory', e.target.value)} placeholder="e.g. Agriculture" required />
              </div>
              <div className="col-span-full">
                <label className="auth-label">Product Description</label>
                <textarea rows={3} value={form.productDescription} onChange={(e) => update('productDescription', e.target.value)} placeholder="Optional description" className="resize-none" />
              </div>
              <div>
                <label className="auth-label">Quantity *</label>
                <input type="number" min="1" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Unit *</label>
                <select value={form.unit} onChange={(e) => update('unit', e.target.value)}>
                  {UNIT_OPTIONS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="auth-label">Product Value *</label>
                <input type="number" min="0" step="0.01" value={form.productValue} onChange={(e) => update('productValue', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Currency *</label>
                <select value={form.currency} onChange={(e) => update('currency', e.target.value)}>
                  {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 – Route */}
        {currentStep === 2 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 2 – Shipment Route</h2>
            <div className="grid-responsive-3">
              <div>
                <label className="auth-label">Source Country *</label>
                <input value={form.sourceCountry} onChange={(e) => update('sourceCountry', e.target.value)} placeholder="e.g. India" required />
              </div>
              <div>
                <label className="auth-label">Source City *</label>
                <input value={form.sourceCity} onChange={(e) => update('sourceCity', e.target.value)} placeholder="e.g. Mumbai" required />
              </div>
              <div>
                <label className="auth-label">Destination Country *</label>
                <input value={form.destinationCountry} onChange={(e) => update('destinationCountry', e.target.value)} placeholder="e.g. USA" required />
              </div>
              <div>
                <label className="auth-label">Destination City *</label>
                <input value={form.destinationCity} onChange={(e) => update('destinationCity', e.target.value)} placeholder="e.g. New York" required />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 – Type */}
        {currentStep === 3 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 3 – Shipment Type</h2>
            <div className="wizard-type-options">
              <label className={`wizard-type-card ${form.exportType === 'domestic' ? 'wizard-type-selected' : ''}`}>
                <input type="radio" name="exportType" value="domestic" checked={form.exportType === 'domestic'} onChange={() => update('exportType', 'domestic')} />
                <span className="wizard-type-title">Domestic</span>
                <span className="wizard-type-desc">Shipment within the same country</span>
              </label>
              <label className={`wizard-type-card ${form.exportType === 'international' ? 'wizard-type-selected' : ''}`}>
                <input type="radio" name="exportType" value="international" checked={form.exportType === 'international'} onChange={() => update('exportType', 'international')} />
                <span className="wizard-type-title">International</span>
                <span className="wizard-type-desc">Cross-border export with customs &amp; documents</span>
              </label>
            </div>

            {form.exportType === 'domestic' && (
              <div className="grid-responsive-3 export-section-header">
                <div>
                  <label className="auth-label">Shipping Method *</label>
                  <select value={form.shippingMethod} onChange={(e) => update('shippingMethod', e.target.value)}>
                    <option value="road">Road</option>
                    <option value="air">Air</option>
                    <option value="sea">Sea</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">Pickup Date *</label>
                  <input type="date" value={form.pickupDate} onChange={(e) => update('pickupDate', e.target.value)} required />
                </div>
              </div>
            )}

            {form.exportType === 'international' && (
              <p className="text-sm text-neutral-gray mt-4">
                Additional steps for exporter information, documents, shipping, and customs will follow.
              </p>
            )}
          </div>
        )}

        {/* Step 4 – Exporter */}
        {currentStep === 4 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 4 – Exporter Information</h2>
            <div className="grid-responsive-3">
              <div>
                <label className="auth-label">Exporter Name *</label>
                <input value={form.exporterName} onChange={(e) => update('exporterName', e.target.value)} placeholder="Full name" required />
              </div>
              <div>
                <label className="auth-label">Company Name *</label>
                <input value={form.companyName} onChange={(e) => update('companyName', e.target.value)} placeholder="Registered company" required />
              </div>
              <div>
                <label className="auth-label">Business Registration Number *</label>
                <input value={form.businessRegistrationNumber} onChange={(e) => update('businessRegistrationNumber', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Contact Number *</label>
                <input type="tel" value={form.contactNumber} onChange={(e) => update('contactNumber', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Email *</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Passport Number <span className="text-neutral-gray font-normal">(Optional for company exporters)</span></label>
                <input value={form.passportNumber} onChange={(e) => update('passportNumber', e.target.value)} placeholder="Required for individual exporters" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5 – Documents */}
        {currentStep === 5 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 5 – Export Documents</h2>
            <p className="text-sm text-neutral-gray mb-4">Provide reference numbers and upload supporting documents</p>

            <div className="space-y-6">
              {[
                { type: 'passport_copy', numField: 'passportNumber' as const, numLabel: 'Passport Number', fileLabel: 'Passport Copy (PDF/Image)' },
                { type: 'export_license_copy', numField: 'exportLicenseNumber' as const, numLabel: 'Export License Number', fileLabel: 'Export License Copy (PDF)' },
                { type: 'declaration_document', numField: 'customerDeclarationNumber' as const, numLabel: 'Customer Declaration Number', fileLabel: 'Declaration Document (PDF)' },
              ].map(({ type, numField, numLabel, fileLabel }) => {
                const doc = getDoc(type);
                return (
                  <div key={type} className="wizard-doc-row">
                    <div>
                      <label className="auth-label">{numLabel} *</label>
                      <input value={form[numField]} onChange={(e) => update(numField, e.target.value)} required />
                    </div>
                    <div>
                      <label className="auth-label">{fileLabel} *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(type, file);
                        }}
                        disabled={uploading === type}
                      />
                      {doc && (
                        <p className="text-sm text-status-success mt-1">
                          ✓ Uploaded: {doc.fileName}
                        </p>
                      )}
                      {uploading === type && <p className="text-sm text-ocean-sky mt-1">Uploading...</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 6 – Shipping */}
        {currentStep === 6 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 6 – Shipping Information</h2>
            <div className="grid-responsive-3">
              <div>
                <label className="auth-label">Shipping Method *</label>
                <select value={form.shippingMethod} onChange={(e) => update('shippingMethod', e.target.value)}>
                  <option value="air">Air</option>
                  <option value="sea">Sea</option>
                  <option value="road">Road</option>
                </select>
              </div>
              <div>
                <label className="auth-label">Estimated Weight (Kg) *</label>
                <input type="number" min="0.1" step="0.1" value={form.estimatedWeight} onChange={(e) => update('estimatedWeight', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Expected Delivery Date *</label>
                <input type="date" value={form.expectedDeliveryDate} onChange={(e) => update('expectedDeliveryDate', e.target.value)} required />
              </div>
              <div>
                <label className="auth-label">Length (cm)</label>
                <input type="number" min="0" value={form.dimensionsLength} onChange={(e) => update('dimensionsLength', e.target.value)} />
              </div>
              <div>
                <label className="auth-label">Width (cm)</label>
                <input type="number" min="0" value={form.dimensionsWidth} onChange={(e) => update('dimensionsWidth', e.target.value)} />
              </div>
              <div>
                <label className="auth-label">Height (cm)</label>
                <input type="number" min="0" value={form.dimensionsHeight} onChange={(e) => update('dimensionsHeight', e.target.value)} />
              </div>
              <div className="col-span-full flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFragile} onChange={(e) => update('isFragile', e.target.checked)} />
                  <span className="text-sm font-medium">Fragile?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.insuranceRequired} onChange={(e) => update('insuranceRequired', e.target.checked)} />
                  <span className="text-sm font-medium">Insurance Required?</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 7 – Customs */}
        {currentStep === 7 && (
          <div className="wizard-panel space-y-4">
            <h2 className="wizard-panel-title">Step 7 – Customs</h2>
            <div className="grid-responsive-3">
              <div>
                <label className="auth-label">HS Code *</label>
                <input value={form.hsCode} onChange={(e) => update('hsCode', e.target.value)} placeholder="e.g. 0901.21" required />
              </div>
              <div>
                <label className="auth-label">Purpose *</label>
                <select value={form.purpose} onChange={(e) => update('purpose', e.target.value)}>
                  <option value="commercial">Commercial</option>
                  <option value="personal">Personal</option>
                  <option value="gift">Gift</option>
                  <option value="sample">Sample</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 8 – Review */}
        {currentStep === 8 && (
          <div className="wizard-panel space-y-6">
            <h2 className="wizard-panel-title">Step 8 – Review &amp; Submit</h2>

            <div className="review-section">
              <h3 className="review-section-title">Product Details</h3>
              <div className="review-grid">
                <ReviewItem label="Product" value={form.productName} />
                <ReviewItem label="Category" value={form.productCategory} />
                <ReviewItem label="Quantity" value={`${form.quantity} ${form.unit}`} />
                <ReviewItem label="Value" value={`${form.currency} ${form.productValue}`} />
                {form.productDescription && <ReviewItem label="Description" value={form.productDescription} />}
              </div>
            </div>

            <div className="review-section">
              <h3 className="review-section-title">Shipment Route</h3>
              <div className="review-grid">
                <ReviewItem label="From" value={`${form.sourceCity}, ${form.sourceCountry}`} />
                <ReviewItem label="To" value={`${form.destinationCity}, ${form.destinationCountry}`} />
                <ReviewItem label="Type" value={form.exportType} />
              </div>
            </div>

            {form.exportType === 'international' && (
              <>
                <div className="review-section">
                  <h3 className="review-section-title">Exporter Details</h3>
                  <div className="review-grid">
                    <ReviewItem label="Exporter" value={form.exporterName} />
                    <ReviewItem label="Company" value={form.companyName} />
                    <ReviewItem label="Registration #" value={form.businessRegistrationNumber} />
                    <ReviewItem label="Contact" value={form.contactNumber} />
                    <ReviewItem label="Email" value={form.email} />
                  </div>
                </div>

                <div className="review-section">
                  <h3 className="review-section-title">Uploaded Documents</h3>
                  <div className="review-grid">
                    <ReviewItem label="Passport #" value={form.passportNumber} />
                    <ReviewItem label="Export License #" value={form.exportLicenseNumber} />
                    <ReviewItem label="Declaration #" value={form.customerDeclarationNumber} />
                    {['passport_copy', 'export_license_copy', 'declaration_document'].map((t) => {
                      const doc = getDoc(t);
                      return (
                        <ReviewItem
                          key={t}
                          label={formatLabel(t)}
                          value={doc ? `✓ ${doc.fileName}` : 'Not uploaded'}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="review-section">
                  <h3 className="review-section-title">Shipping &amp; Customs</h3>
                  <div className="review-grid">
                    <ReviewItem label="Method" value={form.shippingMethod} />
                    <ReviewItem label="Weight" value={`${form.estimatedWeight} Kg`} />
                    <ReviewItem label="Fragile" value={form.isFragile ? 'Yes' : 'No'} />
                    <ReviewItem label="Insurance" value={form.insuranceRequired ? 'Yes' : 'No'} />
                    <ReviewItem label="HS Code" value={form.hsCode} />
                    <ReviewItem label="Purpose" value={form.purpose} />
                    <ReviewItem label="Expected Delivery" value={form.expectedDeliveryDate} />
                  </div>
                </div>
              </>
            )}

            {form.exportType === 'domestic' && (
              <div className="review-section">
                <h3 className="review-section-title">Shipping</h3>
                <div className="review-grid">
                  <ReviewItem label="Method" value={form.shippingMethod} />
                  <ReviewItem label="Pickup Date" value={form.pickupDate} />
                </div>
              </div>
            )}

            <div className="review-costs">
              <div className="review-cost-item">
                <span>Estimated Shipping Cost</span>
                <strong>{form.currency} {costs.estimatedShippingCost.toFixed(2)}</strong>
              </div>
              <div className="review-cost-item">
                <span>Estimated Taxes</span>
                <strong>{form.currency} {costs.estimatedTaxes.toFixed(2)}</strong>
              </div>
              <div className="review-cost-item review-cost-total">
                <span>Expected Delivery</span>
                <strong>{form.expectedDeliveryDate || form.pickupDate || 'TBD'}</strong>
              </div>
            </div>

            {form.exportType === 'international' && (
              <p className="text-sm text-neutral-gray">
                After submission, your documents will be reviewed by an admin before the shipment is processed.
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="wizard-nav">
          {!isFirst && (
            <button type="button" onClick={handleBack} className="btn btn-secondary btn-md" disabled={loading}>
              Back
            </button>
          )}
          <div className="flex-1" />
          {!isLast ? (
            <button type="button" onClick={handleNext} className="btn btn-primary btn-md" disabled={loading}>
              {loading ? 'Saving...' : 'Next'}
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className="btn btn-accent btn-md" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Shipment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-item">
      <span className="review-item-label">{label}</span>
      <span className="review-item-value capitalize">{value || '—'}</span>
    </div>
  );
}
