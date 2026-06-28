'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';

interface Shipment {
  _id: string;
  productName: string;
  quantity: number;
  exportType: 'domestic' | 'international';
  status: 'pending' | 'in_transit' | 'delivered';
  originCountry: string;
  destinationCountry: string;
  createdAt: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ShipmentTracking() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/shipments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setShipments(data.shipments);
      }
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: 'pending' | 'in_transit' | 'delivered') => {
    if (!selectedShipment) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/shipments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shipmentId: selectedShipment._id, status: newStatus }),
      });

      if (response.ok) {
        setToast({ message: 'Shipment status updated successfully', type: 'success' });
        fetchShipments();
        setIsStatusModalOpen(false);
        setSelectedShipment(null);
      } else {
        setToast({ message: 'Failed to update shipment status', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Failed to update shipment status', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-darkBlue mb-2">Shipment Tracking</h1>
        <p className="text-neutral-gray">Monitor and update shipment statuses</p>
      </div>

      <Card>
        <CardBody>
          {shipments.length === 0 ? (
            <p className="text-center text-neutral-gray py-8">No shipments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Route</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment._id} className="border-b border-gray-100 hover:bg-neutral-lightGray transition">
                      <td className="py-3 px-4">
                        <div className="font-medium text-neutral-darkBlue">{shipment.productName}</div>
                        <div className="text-neutral-gray text-xs">Qty: {shipment.quantity}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-neutral-darkBlue">
                            {shipment.userId?.firstName} {shipment.userId?.lastName}
                          </div>
                          <div className="text-neutral-gray text-xs">{shipment.userId?.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-gray">
                        <div className="text-sm">
                          <div>{shipment.originCountry}</div>
                          <div className="text-xs">→ {shipment.destinationCountry}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          shipment.exportType === 'domestic' ? 'badge-domestic' : 'badge-international'
                        }`}>
                          {shipment.exportType === 'domestic' ? <HomeIcon className="icon-sm" /> : <PublicIcon className="icon-sm" />}
                          {shipment.exportType.charAt(0).toUpperCase() + shipment.exportType.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          shipment.status === 'delivered'
                            ? 'badge-delivered'
                            : shipment.status === 'in_transit'
                            ? 'badge-transit'
                            : 'badge-pending'
                        }`}>
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setIsStatusModalOpen(true);
                          }}
                        >
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Status Update Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedShipment(null);
        }}
        title="Update Shipment Status"
      >
        <div className="space-y-4">
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-1">Product</p>
            <p className="font-medium text-neutral-darkBlue">{selectedShipment?.productName}</p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-1">Route</p>
            <p className="font-medium text-neutral-darkBlue">
              {selectedShipment?.originCountry} → {selectedShipment?.destinationCountry}
            </p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-1">Current Status</p>
            <p className="font-medium text-neutral-darkBlue capitalize">
              {selectedShipment?.status.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-gray mb-3">Select New Status</p>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="secondary"
                onClick={() => handleUpdateStatus('pending')}
                disabled={selectedShipment?.status === 'pending'}
              >
                Pending
              </Button>
              <Button
                variant="primary"
                onClick={() => handleUpdateStatus('in_transit')}
                disabled={selectedShipment?.status === 'in_transit'}
              >
                In Transit
              </Button>
              <Button
                variant="success"
                onClick={() => handleUpdateStatus('delivered')}
                disabled={selectedShipment?.status === 'delivered'}
              >
                Delivered
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
