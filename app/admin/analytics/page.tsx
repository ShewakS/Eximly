'use client';

import { useEffect, useState } from 'react';

// Material UI Icons
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface AnalyticsData {
  users: { total: number; admins: number };
  shipments: { total: number; pending: number; inTransit: number; delivered: number };
  orders: { total: number; pending: number; completed: number; cancelled: number };
  documents: { total: number; pending: number; verified: number; rejected: number };
}

function StatCard({
  icon,
  label,
  value,
  sub,
  gradientClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  gradientClass: string;
}) {
  return (
    <div className={`analytics-stat-card ${gradientClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium mb-1 text-white opacity-75">{label}</p>
          <p className="text-4xl font-extrabold">{value}</p>
          {sub && <p className="text-xs mt-1 text-white opacity-50">{sub}</p>}
        </div>
        <div className="text-white opacity-75 text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  const widthStep = Math.min(100, Math.round(pct / 5) * 5);
  const widthClass = `progress-fill-w-${widthStep}`;
  return (
    <div className="flex items-center justify-between p-3 bg-neutral-lightGray rounded-lg gap-4">
      <span className="text-neutral-gray text-sm font-medium w-28 flex-shrink-0">{label}</span>
      <div className="progress-track">
        <div className={`progress-fill ${color} ${widthClass}`} />
      </div>
      <span className="font-bold text-neutral-darkBlue text-sm w-8 text-right">{value}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load analytics');
        return r.json();
      })
      .then((d: AnalyticsData) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-sky" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger text-status-danger px-6 py-4 rounded-xl">
        {error}
      </div>
    );
  }

  const d = data!;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <TrendingUpIcon className="text-ocean-sky text-3xl" />
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-darkBlue">Analytics Overview</h1>
          <p className="text-neutral-gray text-sm mt-0.5">Platform-wide statistics and status breakdowns</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="analytics-stat-card-wrap">
        <StatCard
          icon={<PeopleIcon fontSize="inherit" />}
          label="Total Users"
          value={d.users.total}
          sub={`${d.users.admins} admin${d.users.admins !== 1 ? 's' : ''}`}
          gradientClass="analytics-stat-card-gradient-1"
        />
        <StatCard
          icon={<DirectionsBoatIcon fontSize="inherit" />}
          label="Shipments"
          value={d.shipments.total}
          sub={`${d.shipments.inTransit} in transit`}
          gradientClass="analytics-stat-card-gradient-2"
        />
        <StatCard
          icon={<LocalShippingIcon fontSize="inherit" />}
          label="Orders"
          value={d.orders.total}
          sub={`${d.orders.pending} pending`}
          gradientClass="analytics-stat-card-gradient-3"
        />
        <StatCard
          icon={<DescriptionIcon fontSize="inherit" />}
          label="Documents"
          value={d.documents.total}
          sub={`${d.documents.pending} pending review`}
          gradientClass="analytics-stat-card-gradient-4"
        />
      </div>

      {/* Breakdowns */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Shipments */}
        <div className="card h-full">
          <div className="flex items-center gap-2 mb-6">
            <DirectionsBoatIcon className="text-ocean-sky" />
            <h2 className="text-xl font-bold text-neutral-darkBlue">Shipment Status</h2>
          </div>
          <div className="space-y-3">
            <StatusRow label="Pending" value={d.shipments.pending} total={d.shipments.total} color="bg-status-warning" />
            <StatusRow label="In Transit" value={d.shipments.inTransit} total={d.shipments.total} color="bg-ocean-sky" />
            <StatusRow label="Delivered" value={d.shipments.delivered} total={d.shipments.total} color="bg-status-success" />
          </div>
        </div>

        {/* Orders */}
        <div className="card h-full">
          <div className="flex items-center gap-2 mb-6">
            <LocalShippingIcon className="text-accent-orange" />
            <h2 className="text-xl font-bold text-neutral-darkBlue">Order Status</h2>
          </div>
          <div className="space-y-3">
            <StatusRow label="Pending" value={d.orders.pending} total={d.orders.total} color="bg-status-warning" />
            <StatusRow label="Completed" value={d.orders.completed} total={d.orders.total} color="bg-status-success" />
            <StatusRow label="Cancelled" value={d.orders.cancelled} total={d.orders.total} color="bg-status-danger" />
          </div>
        </div>

        {/* Documents */}
        <div className="card h-full">
          <div className="flex items-center gap-2 mb-6">
            <DescriptionIcon className="text-primary-purple" />
            <h2 className="text-xl font-bold text-neutral-darkBlue">Document Verification</h2>
          </div>
          <div className="space-y-3">
            <StatusRow label="Pending" value={d.documents.pending} total={d.documents.total} color="bg-status-warning" />
            <StatusRow label="Verified" value={d.documents.verified} total={d.documents.total} color="bg-status-success" />
            <StatusRow label="Rejected" value={d.documents.rejected} total={d.documents.total} color="bg-status-danger" />
          </div>
        </div>

        {/* Users */}
        <div className="card h-full">
          <div className="flex items-center gap-2 mb-6">
            <AdminPanelSettingsIcon className="text-ocean-deep" />
            <h2 className="text-xl font-bold text-neutral-darkBlue">User Breakdown</h2>
          </div>
          <div className="space-y-3">
            <StatusRow
              label="Regular Users"
              value={d.users.total - d.users.admins}
              total={d.users.total}
              color="bg-ocean-sky"
            />
            <StatusRow label="Admins" value={d.users.admins} total={d.users.total} color="bg-accent-orange" />
          </div>

          {/* Quick summary chips */}
          <div className="summary-chips-wrap">
            <div className="summary-chip summary-chip-success">
              <CheckCircleIcon className="icon-sm" /> {d.orders.completed} Completed Orders
            </div>
            <div className="summary-chip summary-chip-danger">
              <CancelIcon className="icon-sm" /> {d.orders.cancelled} Cancelled Orders
            </div>
            <div className="summary-chip summary-chip-warning">
              <PendingIcon className="icon-sm" /> {d.shipments.pending} Pending Shipments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
