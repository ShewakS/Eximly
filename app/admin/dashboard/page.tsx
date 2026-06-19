'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';

// Material UI Icons
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';

interface AnalyticsData {
  users: {
    total: number;
    admins: number;
  };
  shipments: {
    total: number;
    pending: number;
    inTransit: number;
    delivered: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  documents: {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
  };
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/analytics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-neutral-darkBlue mb-2">Admin Dashboard</h1>
        <p className="text-neutral-gray">Welcome back! Here's an overview of your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-ocean-sky to-ocean-deep text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold mt-1">{analytics?.users.total || 0}</p>
                <p className="text-white/60 text-xs mt-1">{analytics?.users.admins || 0} admins</p>
              </div>
              <PeopleIcon className="text-4xl text-white/80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-ocean-sky to-ocean-deep text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Shipments</p>
                <p className="text-3xl font-bold mt-1">{analytics?.shipments.total || 0}</p>
                <p className="text-white/60 text-xs mt-1">{analytics?.shipments.inTransit || 0} in transit</p>
              </div>
              <DirectionsBoatIcon className="text-4xl text-white/80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-ocean-sky to-ocean-deep text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold mt-1">{analytics?.orders.total || 0}</p>
                <p className="text-white/60 text-xs mt-1">{analytics?.orders.pending || 0} pending</p>
              </div>
              <LocalShippingIcon className="text-4xl text-white/80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-ocean-sky to-ocean-deep text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Documents</p>
                <p className="text-3xl font-bold mt-1">{analytics?.documents.total || 0}</p>
                <p className="text-white/60 text-xs mt-1">{analytics?.documents.pending || 0} pending</p>
              </div>
              <DescriptionIcon className="text-4xl text-white/80" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <h3 className="text-xl font-bold text-neutral-darkBlue mb-4">Shipment Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Pending</span>
                <span className="font-bold text-neutral-darkBlue">{analytics?.shipments.pending || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">In Transit</span>
                <span className="font-bold text-ocean-sky">{analytics?.shipments.inTransit || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Delivered</span>
                <span className="font-bold text-status-success">{analytics?.shipments.delivered || 0}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-xl font-bold text-neutral-darkBlue mb-4">Order Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Pending</span>
                <span className="font-bold text-neutral-darkBlue">{analytics?.orders.pending || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Completed</span>
                <span className="font-bold text-status-success">{analytics?.orders.completed || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Cancelled</span>
                <span className="font-bold text-status-danger">{analytics?.orders.cancelled || 0}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-xl font-bold text-neutral-darkBlue mb-4">Document Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Pending</span>
                <span className="font-bold text-neutral-darkBlue">{analytics?.documents.pending || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Verified</span>
                <span className="font-bold text-status-success">{analytics?.documents.verified || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Rejected</span>
                <span className="font-bold text-status-danger">{analytics?.documents.rejected || 0}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-xl font-bold text-neutral-darkBlue mb-4">User Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Total Users</span>
                <span className="font-bold text-neutral-darkBlue">{analytics?.users.total || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Admins</span>
                <span className="font-bold text-accent-orange">{analytics?.users.admins || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg">
                <span className="text-neutral-gray">Regular Users</span>
                <span className="font-bold text-ocean-sky">{(analytics?.users.total || 0) - (analytics?.users.admins || 0)}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
