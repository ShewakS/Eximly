'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Material UI Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      setUserName(userData.firstName || userData.name || 'User');
      setUserRole(userData.role || 'user');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('user');
    setIsDropdownOpen(false);
    router.push('/');
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Bar - Contact Information */}
      <div className="nav-topbar hidden md:block">
        <div className="container-max flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 nav-topbar-item">
              <EmailIcon className="icon-sm text-ocean-sky" /> info@eximly.com
            </span>
            <span className="flex items-center gap-2 nav-topbar-item">
              <PhoneIcon className="icon-sm text-ocean-sky" /> +1-800-EXIMLY
            </span>
            <span className="flex items-center gap-2 nav-topbar-item">
              <AccessTimeIcon className="icon-sm text-ocean-sky" /> Mon - Sat: 9:00 - 18:00
            </span>
          </div>
          <div className="flex items-center gap-4 nav-topbar-item">
            <span className="hover:text-ocean-light transition cursor-pointer">Support</span>
            <span className="nav-topbar-separator">|</span>
            <span className="hover:text-ocean-light transition cursor-pointer">FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="nav-main">
        <div className="container-max flex items-center justify-between nav-main-container">
          {/* Logo */}
          <div className="flex items-center gap-2 nav-logo">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2 transition nav-logo-link">
              <DirectionsBoatIcon className="nav-logo-icon" />
              <span className="tracking-wider text-2xl font-extrabold nav-logo-text">Eximly</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 nav-links-desktop">
            {!isLoggedIn ? (
              <>
                <Link href="/" className={isActive('/') ? 'nav-link nav-link-active' : 'nav-link'}>Home</Link>
                <Link href="/about" className={isActive('/about') ? 'nav-link nav-link-active' : 'nav-link'}>About Us</Link>
                <Link href="/services" className={isActive('/services') ? 'nav-link nav-link-active' : 'nav-link'}>Services</Link>
                <Link href="/contact" className={isActive('/contact') ? 'nav-link nav-link-active' : 'nav-link'}>Contact</Link>
              </>
            ) : userRole === 'admin' ? (
              <>
                <Link href="/admin/dashboard" className={isActive('/admin/dashboard') ? 'nav-link nav-link-active' : 'nav-link'}>
                  <DashboardIcon className="icon-sm mr-1.5" /> Admin Dashboard
                </Link>
                <Link href="/admin/users" className={isActive('/admin/users') ? 'nav-link nav-link-active' : 'nav-link'}>
                  <PeopleIcon className="icon-sm mr-1.5" /> Users
                </Link>
                <Link href="/admin/analytics" className={isActive('/admin/analytics') ? 'nav-link nav-link-active' : 'nav-link'}>
                  <TrendingUpIcon className="icon-sm mr-1.5" /> Analytics
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className={isActive('/dashboard') ? 'nav-link nav-link-active' : 'nav-link'}>
                  <DashboardIcon className="icon-sm mr-1.5" /> Dashboard
                </Link>
                <Link href="/export/form" className={isActive('/export/form') ? 'nav-link nav-link-active' : 'nav-link'}>
                  <AddCircleIcon className="icon-sm mr-1.5" /> Add Shipment
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Login/User Menu */}
          <div className="flex items-center gap-4 nav-right-side">
            {!isLoggedIn ? (
              <Link href="/auth/login" className="nav-login-btn">
                LOGIN
              </Link>
            ) : (
              <div className="relative flex items-center nav-user-menu-wrapper">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 nav-user-btn"
                >
                  <PersonIcon className="text-lg" />
                  <span>{userName}</span>
                  <ArrowDropDownIcon className="text-lg" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute nav-dropdown-menu">
                    {userRole === 'admin' ? (
                      <>
                        <Link href="/admin/dashboard" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>Admin Dashboard</Link>
                        <Link href="/admin/users" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>Users</Link>
                        <Link href="/admin/analytics" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>Analytics</Link>
                      </>
                    ) : (
                      <>
                        <Link href="/dashboard" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>Dashboard</Link>
                        <Link href="/export/form" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>Add Shipment</Link>
                      </>
                    )}
                    <div className="nav-dropdown-separator"></div>
                    <button
                      onClick={handleLogout}
                      className="nav-dropdown-logout"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition nav-mobile-btn"
            >
              {isMobileMenuOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in nav-mobile-menu">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Link href="/" className={isActive('/') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" className={isActive('/about') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                <Link href="/services" className={isActive('/services') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
                <Link href="/contact" className={isActive('/contact') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <Link
                  href="/auth/login"
                  className="btn btn-primary btn-md text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  LOGIN
                </Link>
              </div>
            ) : userRole === 'admin' ? (
              <div className="flex flex-col gap-4">
                <Link href="/admin/dashboard" className={isActive('/admin/dashboard') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
                <Link href="/admin/users" className={isActive('/admin/users') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Users</Link>
                <Link href="/admin/analytics" className={isActive('/admin/analytics') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Analytics</Link>
                <div className="nav-dropdown-separator"></div>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="nav-dropdown-logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/dashboard" className={isActive('/dashboard') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <Link href="/export/form" className={isActive('/export/form') ? 'nav-mobile-link nav-mobile-link-active' : 'nav-mobile-link'} onClick={() => setIsMobileMenuOpen(false)}>Add Shipment</Link>
                <div className="nav-dropdown-separator"></div>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="nav-dropdown-logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
