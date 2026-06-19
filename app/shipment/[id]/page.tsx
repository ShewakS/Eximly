'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

interface ShipmentDetail {
  _id: string;
  productName: string;
  quantity: number;
  originCountry: string;
  destinationCountry: string;
  exportType: string;
  status: string;
  passportNumber?: string;
  customsDeclarationId?: string;
  exportLicenseNumber?: string;
  shippingMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentDetail | null>(null);
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

      if (!res.ok) {
        throw new Error('Failed to fetch shipment');
      }

      const data = await res.json();
      setShipment(data.shipment);
    } catch (err) {
      setError('Failed to load shipment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this shipment?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/shipments/${params.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to delete shipment');
      }

      router.push('/dashboard');
    } catch (err) {
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
          <Link href="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-primary-blue hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="card">
          <h1 className="text-3xl font-bold mb-8 text-neutral-dark">{shipment.productName}</h1>

          <div className="grid-responsive-3 mb-8">
            <div>
              <label className="text-neutral-gray text-sm font-semibold">Quantity</label>
              <p className="text-xl font-semibold text-neutral-dark">{shipment.quantity}</p>
            </div>
            <div>
              <label className="text-neutral-gray text-sm font-semibold">Status</label>
              <p className={`text-xl font-semibold ${
                shipment.status === 'delivered'
                  ? 'text-status-success'
                  : shipment.status === 'in_transit'
                  ? 'text-accent-orange'
                  : 'text-status-warning'
              }`}>
                {shipment.status.replace('_', ' ').charAt(0).toUpperCase() + shipment.status.replace('_', ' ').slice(1)}
              </p>
            </div>
            <div>
              <label className="text-neutral-gray text-sm font-semibold">Export Type</label>
              <p className="text-xl font-semibold text-neutral-dark">
                {shipment.exportType === 'domestic' ? (
                  <span className="inline-flex items-center gap-1">
                    <HomeIcon className="text-lg text-ocean-sky" /> Domestic
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <PublicIcon className="text-lg text-ocean-sky" /> International
                  </span>
                )}
              </p>
            </div>
            <div>
              <label className="text-neutral-gray text-sm font-semibold">Date Created</label>
              <p className="text-xl font-semibold text-neutral-dark">
                {new Date(shipment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t-2 border-neutral-light pt-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Shipment Details</h2>
            <div className="grid-responsive-3">
              <div>
                <label className="text-neutral-gray text-sm font-semibold">Origin Country</label>
                <p className="text-lg text-neutral-dark">{shipment.originCountry}</p>
              </div>
              <div>
                <label className="text-neutral-gray text-sm font-semibold">Destination Country</label>
                <p className="text-lg text-neutral-dark">{shipment.destinationCountry}</p>
              </div>
            </div>
          </div>

          {shipment.exportType === 'international' && (
            <div className="border-t-2 border-neutral-light pt-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-neutral-dark">International Export Details</h2>
              <div className="grid-responsive-3">
                <div>
                  <label className="text-neutral-gray text-sm font-semibold">Passport Number</label>
                  <p className="text-lg text-neutral-dark">{shipment.passportNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-neutral-gray text-sm font-semibold">Customs Declaration ID</label>
                  <p className="text-lg text-neutral-dark">{shipment.customsDeclarationId || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-neutral-gray text-sm font-semibold">Export License Number</label>
                  <p className="text-lg text-neutral-dark">{shipment.exportLicenseNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-neutral-gray text-sm font-semibold">Shipping Method</label>
                  <p className="text-lg text-neutral-dark">
                    {shipment.shippingMethod === 'air' ? (
                      <span className="inline-flex items-center gap-1">
                        <FlightIcon className="text-lg text-ocean-sky" /> Air
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <DirectionsBoatIcon className="text-lg text-ocean-sky" /> Sea
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="border-t-2 border-neutral-light pt-8 flex gap-4">
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="btn-danger disabled:opacity-50"
            >
              {deleteLoading ? 'Deleting...' : 'Delete Shipment'}
            </button>
            <Link href="/dashboard" className="btn-secondary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
