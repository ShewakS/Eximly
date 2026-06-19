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
      <div className="bg-neutral-dark text-white text-xs py-2.5 px-6 hidden md:block">
        <div className="container-max flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-neutral-lightGray/80">
              <EmailIcon className="text-[14px] text-ocean-sky" /> info@eximly.com
            </span>
            <span className="flex items-center gap-2 text-neutral-lightGray/80">
              <PhoneIcon className="text-[14px] text-ocean-sky" /> +1-800-EXIMLY
            </span>
            <span className="flex items-center gap-2 text-neutral-lightGray/80">
              <AccessTimeIcon className="text-[14px] text-ocean-sky" /> Mon - Sat: 9:00 - 18:00
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-lightGray/80">
            <span className="hover:text-ocean-light transition cursor-pointer">Support</span>
            <span className="text-white/20">|</span>
            <span className="hover:text-ocean-light transition cursor-pointer">FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white text-neutral-dark border-b border-neutral-light py-0">
        <div className="container-max flex items-center justify-between h-[80px]">
          {/* Logo */}
          <div className="flex items-center gap-2 pl-4 md:pl-0">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2 text-neutral-darkBlue hover:opacity-90 transition">
              <DirectionsBoatIcon className="text-ocean-sky text-3xl" />
              <span className="tracking-wider text-2xl font-extrabold text-neutral-darkBlue">Eximly</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/about') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  About Us
                </Link>
                <Link
                  href="/services"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/services') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/contact') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  Contact
                </Link>
              </>
            ) : userRole === 'admin' ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/admin/dashboard') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  <DashboardIcon className="text-sm mr-1.5" /> Admin Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/admin/users') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  <PeopleIcon className="text-sm mr-1.5" /> Users
                </Link>
                <Link
                  href="/admin/analytics"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/admin/analytics') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  <TrendingUpIcon className="text-sm mr-1.5" /> Analytics
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/dashboard') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  <DashboardIcon className="text-sm mr-1.5" /> Dashboard
                </Link>
                <Link
                  href="/export/form"
                  className={`flex items-center h-full border-b-2 hover:text-ocean-sky transition font-semibold text-sm ${
                    isActive('/export/form') ? 'border-ocean-sky text-ocean-sky' : 'border-transparent text-neutral-gray'
                  }`}
                >
                  <AddCircleIcon className="text-sm mr-1.5" /> Add Shipment
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Login/User Menu */}
          <div className="flex items-center gap-4 h-full pr-4 md:pr-0">
            {!isLoggedIn ? (
              <Link
                href="/auth/login"
                className="bg-ocean-sky hover:bg-ocean-deep text-white font-bold text-sm px-6 h-full flex items-center transition relative overflow-hidden cursor-pointer"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%)' }}
              >
                LOGIN
              </Link>
            ) : (
              <div className="relative flex items-center h-full">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-accent-orange hover:bg-accent-orangeHover flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition text-white"
                >
                  <PersonIcon className="text-lg" />
                  <span>{userName}</span>
                  <ArrowDropDownIcon className="text-lg" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-[65px] w-48 bg-white border border-neutral-light text-neutral-dark rounded-lg shadow-xl py-2 z-50">
                    {userRole === 'admin' ? (
                      <>
                        <Link
                          href="/admin/dashboard"
                          className="block px-4 py-2.5 hover:bg-neutral-light transition text-sm font-medium"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                        <Link
                          href="/admin/users"
                          className="block px-4 py-2.5 hover:bg-neutral-light transition text-sm font-medium"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Users
                        </Link>
                        <Link
                          href="/admin/analytics"
                          className="block px-4 py-2.5 hover:bg-neutral-light transition text-sm font-medium"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Analytics
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2.5 hover:bg-neutral-light transition text-sm font-medium"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/export/form"
                          className="block px-4 py-2.5 hover:bg-neutral-light transition text-sm font-medium"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Add Shipment
                        </Link>
                      </>
                    )}
                    <div className="border-t border-neutral-light my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 hover:bg-neutral-light transition font-bold text-sm text-status-danger"
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
              className="md:hidden p-2 rounded-lg hover:bg-neutral-light text-neutral-dark transition"
            >
              {isMobileMenuOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 border-t border-neutral-light pt-4 bg-white animate-fade-in">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/about') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/services"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/services') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/contact') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-ocean-sky hover:bg-ocean-deep text-white text-center font-bold py-3 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  LOGIN
                </Link>
              </div>
            ) : userRole === 'admin' ? (
              <div className="flex flex-col gap-4">
                <Link
                  href="/admin/dashboard"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/admin/dashboard') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/admin/users') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Users
                </Link>
                <Link
                  href="/admin/analytics"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/admin/analytics') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <div className="border-t border-neutral-light my-1"></div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-status-danger font-bold py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/dashboard') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/export/form"
                  className={`hover:text-ocean-sky transition py-2 font-semibold ${isActive('/export/form') ? 'text-ocean-sky font-bold' : 'text-neutral-gray'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Shipment
                </Link>
                <div className="border-t border-neutral-light my-1"></div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-status-danger font-bold py-2"
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
