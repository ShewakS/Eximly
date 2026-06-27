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
    { href: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon className="text-lg" /> },
    { href: '/admin/users', label: 'Users', icon: <PeopleIcon className="text-lg" /> },
    { href: '/admin/shipments', label: 'Shipments', icon: <DirectionsBoatIcon className="text-lg" /> },
    { href: '/admin/documents', label: 'Documents', icon: <DescriptionIcon className="text-lg" /> },
    { href: '/admin/orders', label: 'Orders', icon: <LocalShippingIcon className="text-lg" /> },
    { href: '/admin/analytics', label: 'Analytics', icon: <TrendingUpIcon className="text-lg" /> },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-neutral-lightGray flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-ocean-deep text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-2xl font-bold flex items-center gap-2 text-white hover:opacity-90 transition">
            <DirectionsBoatIcon className="text-ocean-sky text-2xl" />
            <span className="tracking-wider">Eximly Admin</span>
          </Link>
        </div>
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-ocean-sky text-white font-bold shadow-md'
                      : 'hover:bg-white/10 text-white/80 hover:text-white'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="flex items-center">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
          >
            <HomeIcon className="text-lg" />
            <span className="font-medium text-sm">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Desktop Header */}
        <header className="bg-white border-b border-gray-150 h-16 hidden md:flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <AdminPanelSettingsIcon className="text-ocean-sky text-xl" />
            <span className="text-sm font-bold text-neutral-dark">Control Panel</span>
            <span className="text-neutral-light">|</span>
            <span className="text-[11px] text-ocean-deep bg-ocean-sky/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Production Mode
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-neutral-dark">System Admin</p>
              <p className="text-xs text-neutral-gray">admin@eximly.com</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-ocean-sky/15 text-ocean-sky font-bold flex items-center justify-center border border-ocean-sky/20">
              A
            </div>
          </div>
        </header>

        {/* Mobile header */}
        <div className="md:hidden bg-ocean-deep text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition text-white"
          >
            <MenuIcon />
          </button>
          <span className="font-bold flex items-center gap-2">
            <DirectionsBoatIcon className="text-ocean-sky text-xl" />
            Eximly Admin
          </span>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="p-8 flex-1 bg-neutral-lightGray overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
