'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';

interface Shipment {
  _id: string;
  productName: string;
  quantity: number;
  exportType: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchShipments(token);
  }, [router]);

  const fetchShipments = async (token: string) => {
    try {
      const res = await fetch('/api/shipments', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch shipments');
      }

      const data = await res.json();
      setShipments(data.shipments);
    } catch (err) {
      setError('Failed to load shipments');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-lightGray flex items-center justify-center">
        <p className="text-neutral-gray">Loading...</p>
      </div>
    );
  }

  const totalShipments = shipments.length;
  const activeOrders = shipments.filter(s => s.status === 'in_transit').length;
  const completedTrades = shipments.filter(s => s.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-dark mb-2">
            Welcome back, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-neutral-gray">Here's your shipment overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-blue mb-2">{totalShipments}</div>
            <p className="text-neutral-gray font-semibold">Total Shipments</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-accent-orange mb-2">{activeOrders}</div>
            <p className="text-neutral-gray font-semibold">Active Orders</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-status-success mb-2">{completedTrades}</div>
            <p className="text-neutral-gray font-semibold">Completed Trades</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-12">
          <Link href="/export/form" className="btn-primary inline-flex items-center gap-1.5">
            <AddIcon className="text-lg" /> Add Shipment
          </Link>
        </div>

        {/* Shipments Table */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Shipments</h2>

          {error && (
            <div className="bg-status-danger bg-opacity-10 border border-status-danger text-status-danger px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-center text-neutral-gray py-8">Loading...</p>
          ) : shipments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-gray mb-4">No shipments yet</p>
              <Link href="/export/form" className="text-primary-blue font-semibold hover:underline">
                Create your first shipment
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-light">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment._id} className="border-b border-neutral-light hover:bg-neutral-light">
                      <td className="py-3 px-4">{shipment.productName}</td>
                      <td className="py-3 px-4">{shipment.quantity}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          shipment.exportType === 'domestic'
                            ? 'bg-status-info bg-opacity-20 text-status-info'
                            : 'bg-accent-orange bg-opacity-20 text-accent-orange'
                        }`}>
                          {shipment.exportType === 'domestic' ? (
                            <>
                              <HomeIcon className="text-sm" /> Domestic
                            </>
                          ) : (
                            <>
                              <PublicIcon className="text-sm" /> International
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          shipment.status === 'delivered'
                            ? 'bg-status-success bg-opacity-20 text-status-success'
                            : shipment.status === 'in_transit'
                            ? 'bg-accent-orange bg-opacity-20 text-accent-orange'
                            : 'bg-status-warning bg-opacity-20 text-status-warning'
                        }`}>
                          {shipment.status.replace('_', ' ').charAt(0).toUpperCase() + shipment.status.replace('_', ' ').slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-gray">
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/shipment/${shipment._id}`}
                          className="text-primary-blue hover:underline font-semibold"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
