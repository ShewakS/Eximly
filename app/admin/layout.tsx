'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { href: '/admin/dashboard', label: 'Dashboard',  icon: <DashboardIcon className="icon-sm" /> },
    { href: '/admin/users',     label: 'Users',       icon: <PeopleIcon className="icon-sm" /> },
    { href: '/admin/shipments', label: 'Shipments',   icon: <DirectionsBoatIcon className="icon-sm" /> },
    { href: '/admin/documents', label: 'Documents',   icon: <DescriptionIcon className="icon-sm" /> },
    { href: '/admin/orders',    label: 'Orders',      icon: <LocalShippingIcon className="icon-sm" /> },
    { href: '/admin/analytics', label: 'Analytics',   icon: <TrendingUpIcon className="icon-sm" /> },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-neutral-lightGray flex">

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="admin-mobile-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${isSidebarOpen ? 'admin-sidebar-open' : 'admin-sidebar-closed'}`}
      >
        {/* Logo */}
        <div className="admin-sidebar-header">
          <Link href="/admin/dashboard" className="admin-sidebar-logo">
            <DirectionsBoatIcon className="icon-md text-ocean-sky" />
            <span className="tracking-wide">Eximly Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="admin-sidebar-nav">
          <ul className="admin-sidebar-menu">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`admin-nav-link ${isActive(item.href) ? 'admin-nav-link-active' : ''}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="flex items-center">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Home */}
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-sidebar-back-link">
            <HomeIcon className="icon-sm" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Desktop Header */}
        <header className="hidden md:flex admin-header">
          <div className="flex items-center gap-3">
            <AdminPanelSettingsIcon className="icon-sm text-ocean-sky" />
            <span className="text-sm font-bold text-neutral-dark">Control Panel</span>
            <span className="text-neutral-light">|</span>
            <span className="admin-info-badge">Production Mode</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-sm text-neutral-dark">System Admin</p>
              <p className="text-xs text-neutral-gray">admin@eximly.com</p>
            </div>
            <div className="admin-profile-circle">A</div>
          </div>
        </header>

        {/* Mobile Header */}
        <div className="md:hidden admin-mobile-header">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg text-white"
          >
            <MenuIcon />
          </button>
          <span className="font-bold flex items-center gap-2">
            <DirectionsBoatIcon className="icon-sm text-ocean-sky" />
            Eximly Admin
          </span>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="admin-main">
          <div className="container-max">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
