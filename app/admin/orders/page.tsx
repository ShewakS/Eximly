'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

interface OrderProduct {
  productId: {
    name: string;
    category: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  products: OrderProduct[];
}

export default function OrderMonitoring() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: 'pending' | 'completed' | 'cancelled') => {
    if (!selectedOrder) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: selectedOrder._id,
          status: newStatus,
        }),
      });

      if (response.ok) {
        setToast({ message: 'Order status updated successfully', type: 'success' });
        fetchOrders();
        setIsStatusModalOpen(false);
        setSelectedOrder(null);
      } else {
        setToast({ message: 'Failed to update order status', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Failed to update order status', type: 'error' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
        <h1 className="text-3xl font-bold text-neutral-darkBlue mb-2">Order Monitoring</h1>
        <p className="text-neutral-gray">Track and manage customer orders</p>
      </div>

      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Products</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 hover:bg-neutral-lightGray transition">
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-darkBlue">
                        #{order._id.slice(-8)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-neutral-darkBlue">
                          {order.user.firstName} {order.user.lastName}
                        </div>
                        <div className="text-neutral-gray text-xs">{order.user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-neutral-gray">
                        {order.products.length} item{order.products.length !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-darkBlue">
                        ${order.totalAmount.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-gray">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed'
                            ? 'bg-status-success text-white'
                            : order.status === 'cancelled'
                            ? 'bg-status-danger text-white'
                            : 'bg-status-warning text-gray-900'
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
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
        </CardBody>
      </Card>

      {/* Status Update Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedOrder(null);
        }}
        title="Update Order Status"
      >
        <div className="space-y-4">
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">Order ID</p>
            <p className="font-medium text-neutral-darkBlue">
              #{selectedOrder?._id.slice(-8)}
            </p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">Customer</p>
            <p className="font-medium text-neutral-darkBlue">
              {selectedOrder?.user.firstName} {selectedOrder?.user.lastName}
            </p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">Total Amount</p>
            <p className="font-medium text-neutral-darkBlue">
              ${selectedOrder?.totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">Current Status</p>
            <p className="font-medium text-neutral-darkBlue">
              {selectedOrder?.status.toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-gray mb-3">Select New Status</p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => handleUpdateStatus('pending')}
                disabled={selectedOrder?.status === 'pending'}
              >
                Pending
              </Button>
              <Button
                variant="success"
                onClick={() => handleUpdateStatus('completed')}
                disabled={selectedOrder?.status === 'completed'}
              >
                Completed
              </Button>
              <Button
                variant="danger"
                onClick={() => handleUpdateStatus('cancelled')}
                disabled={selectedOrder?.status === 'cancelled'}
              >
                Cancelled
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
