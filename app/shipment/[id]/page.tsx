'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface ShipmentDoc {
  _id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  status: string;
  rejectionReason?: string;
}

interface ShipmentDetail {
  _id: string;
  productName: string;
  productCategory?: string;
  productDescription?: string;
  quantity: number;
  unit?: string;
  productValue?: number;
  currency?: string;
  sourceCountry?: string;
  sourceCity?: string;
  destinationCountry?: string;
  destinationCity?: string;
  originCountry?: string;
  exportType: string;
  status: string;
  documentVerificationStatus?: string;
  rejectionReason?: string;
  passportNumber?: string;
  exportLicenseNumber?: string;
  customerDeclarationNumber?: string;
  customsDeclarationId?: string;
  exporterName?: string;
  companyName?: string;
  businessRegistrationNumber?: string;
  contactNumber?: string;
  email?: string;
  shippingMethod?: string;
  estimatedWeight?: number;
  dimensionsLength?: number;
  dimensionsWidth?: number;
  dimensionsHeight?: number;
  isFragile?: boolean;
  insuranceRequired?: boolean;
  expectedDeliveryDate?: string;
  pickupDate?: string;
  hsCode?: string;
  purpose?: string;
  estimatedShippingCost?: number;
  estimatedTaxes?: number;
  createdAt: string;
  updatedAt: string;
}

function DetailField({ label, value }: { label: string; value?: string | number | boolean | null }) {
  if (value === undefined || value === null || value === '') return null;
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
  return (
    <div>
      <label className="text-neutral-gray text-sm font-semibold">{label}</label>
      <p className="text-lg text-neutral-dark capitalize">{display}</p>
    </div>
  );
}

function ShippingMethodIcon({ method }: { method?: string }) {
  if (method === 'air') return <><FlightIcon className="text-lg text-ocean-sky" /> Air</>;
  if (method === 'sea') return <><DirectionsBoatIcon className="text-lg text-ocean-sky" /> Sea</>;
  if (method === 'road') return <><LocalShippingIcon className="text-lg text-ocean-sky" /> Road</>;
  return <>{method || 'N/A'}</>;
}

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentDetail | null>(null);
  const [documents, setDocuments] = useState<ShipmentDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchShipment(token);
  }, [params.id, router]);

  const fetchShipment = async (token: string) => {
    try {
      const res = await fetch(`/api/shipments/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch shipment');
      const data = await res.json();
      setShipment(data.shipment);
      setDocuments(data.documents || []);
    } catch {
      setError('Failed to load shipment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this shipment?')) return;
    const token = localStorage.getItem('token');
    if (!token) { router.push('/auth/login'); return; }
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/shipments/${params.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      router.push('/dashboard');
    } catch {
      setError('Failed to delete shipment');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-light py-12 px-6 flex items-center justify-center">
        <p className="text-neutral-gray">Loading...</p>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen bg-neutral-light py-12 px-6">
        <div className="max-w-2xl mx-auto card">
          <p className="text-status-danger mb-4">{error || 'Shipment not found'}</p>
          <Link href="/dashboard" className="btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const sourceCountry = shipment.sourceCountry || shipment.originCountry;

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-primary-blue hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        {shipment.status === 'documents_rejected' && shipment.rejectionReason && (
          <div className="auth-error-box mb-6">
            <strong>Documents Rejected:</strong> {shipment.rejectionReason}
            <p className="text-sm mt-2">Please re-upload corrected documents via the export form.</p>
          </div>
        )}

        <div className="card mb-6">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-neutral-dark">{shipment.productName}</h1>
            <span className={`badge ${
              shipment.status === 'delivered' ? 'badge-delivered-soft'
                : shipment.status === 'in_transit' ? 'badge-transit-soft'
                : shipment.status === 'documents_rejected' ? 'badge-rejected'
                : 'badge-pending-soft'
            }`}>
              {shipment.status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="grid-responsive-3 mb-6">
            <DetailField label="Category" value={shipment.productCategory} />
            <DetailField label="Quantity" value={shipment.quantity ? `${shipment.quantity} ${shipment.unit || ''}` : undefined} />
            <DetailField label="Value" value={shipment.productValue ? `${shipment.currency} ${shipment.productValue}` : undefined} />
            <DetailField label="Export Type" value={shipment.exportType} />
            <DetailField label="Doc Verification" value={shipment.documentVerificationStatus} />
          </div>

          {shipment.productDescription && (
            <p className="text-neutral-gray text-sm mb-6">{shipment.productDescription}</p>
          )}
        </div>

        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4 text-neutral-dark">Route</h2>
          <div className="grid-responsive-3">
            <DetailField label="From" value={`${shipment.sourceCity || ''}, ${sourceCountry || ''}`} />
            <DetailField label="To" value={`${shipment.destinationCity || ''}, ${shipment.destinationCountry || ''}`} />
          </div>
        </div>

        {shipment.exportType === 'international' && (
          <>
            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4 text-neutral-dark">Exporter Information</h2>
              <div className="grid-responsive-3">
                <DetailField label="Exporter Name" value={shipment.exporterName} />
                <DetailField label="Company" value={shipment.companyName} />
                <DetailField label="Registration #" value={shipment.businessRegistrationNumber} />
                <DetailField label="Contact" value={shipment.contactNumber} />
                <DetailField label="Email" value={shipment.email} />
                <DetailField label="Passport #" value={shipment.passportNumber} />
              </div>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4 text-neutral-dark">Documents</h2>
              <div className="grid-responsive-3 mb-4">
                <DetailField label="Export License #" value={shipment.exportLicenseNumber} />
                <DetailField label="Declaration #" value={shipment.customerDeclarationNumber || shipment.customsDeclarationId} />
              </div>
              {documents.length > 0 ? (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc._id} className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{doc.documentType.replace(/_/g, ' ')}</p>
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-ocean-sky text-sm hover:underline">
                          {doc.fileName}
                        </a>
                        {doc.rejectionReason && (
                          <p className="text-status-danger text-xs mt-1">Rejected: {doc.rejectionReason}</p>
                        )}
                      </div>
                      <span className={`badge ${
                        doc.status === 'verified' ? 'badge-delivered'
                          : doc.status === 'rejected' ? 'badge-rejected'
                          : 'badge-pending'
                      }`}>{doc.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-gray text-sm">No documents uploaded yet</p>
              )}
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4 text-neutral-dark">Shipping &amp; Customs</h2>
              <div className="grid-responsive-3">
                <div>
                  <label className="text-neutral-gray text-sm font-semibold">Shipping Method</label>
                  <p className="text-lg text-neutral-dark inline-flex items-center gap-1">
                    <ShippingMethodIcon method={shipment.shippingMethod} />
                  </p>
                </div>
                <DetailField label="Weight" value={shipment.estimatedWeight ? `${shipment.estimatedWeight} Kg` : undefined} />
                <DetailField label="Dimensions (L×W×H cm)" value={
                  shipment.dimensionsLength
                    ? `${shipment.dimensionsLength} × ${shipment.dimensionsWidth} × ${shipment.dimensionsHeight}`
                    : undefined
                } />
                <DetailField label="Fragile" value={shipment.isFragile} />
                <DetailField label="Insurance" value={shipment.insuranceRequired} />
                <DetailField label="HS Code" value={shipment.hsCode} />
                <DetailField label="Purpose" value={shipment.purpose} />
                <DetailField label="Expected Delivery" value={
                  shipment.expectedDeliveryDate
                    ? new Date(shipment.expectedDeliveryDate).toLocaleDateString()
                    : undefined
                } />
              </div>
            </div>
          </>
        )}

        {shipment.exportType === 'domestic' && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4 text-neutral-dark">Shipping</h2>
            <div className="grid-responsive-3">
              <div>
                <label className="text-neutral-gray text-sm font-semibold">Method</label>
                <p className="text-lg text-neutral-dark inline-flex items-center gap-1">
                  <ShippingMethodIcon method={shipment.shippingMethod} />
                </p>
              </div>
              <DetailField label="Pickup Date" value={
                shipment.pickupDate ? new Date(shipment.pickupDate).toLocaleDateString() : undefined
              } />
            </div>
          </div>
        )}

        {(shipment.estimatedShippingCost || shipment.estimatedTaxes) && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4 text-neutral-dark">Cost Estimates</h2>
            <div className="review-costs">
              <div className="review-cost-item">
                <span>Estimated Shipping</span>
                <strong>{shipment.currency} {shipment.estimatedShippingCost?.toFixed(2)}</strong>
              </div>
              <div className="review-cost-item">
                <span>Estimated Taxes</span>
                <strong>{shipment.currency} {shipment.estimatedTaxes?.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={handleDelete} disabled={deleteLoading} className="btn btn-danger btn-md disabled:opacity-50">
            {deleteLoading ? 'Deleting...' : 'Delete Shipment'}
          </button>
          <Link href="/dashboard" className="btn btn-secondary btn-md">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
