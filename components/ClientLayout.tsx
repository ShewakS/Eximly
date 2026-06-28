'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Link from 'next/link';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') || false;

  return (
    <div className="layout-shell">
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && (
        <footer className="footer-container">
          <div className="container-max px-6">
            <div className="footer-grid">
              <div>
                <h3 className="text-xl font-bold mb-4 text-ocean-sky">Eximly</h3>
                <p className="text-neutral-gray text-sm leading-relaxed">
                  Simplifying import-export management for modern logistics and supply chains.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-white">Quick Links</h4>
                <ul className="space-y-2 text-neutral-gray text-sm">
                  <li>
                    <Link href="/privacy-policy" className="hover:text-ocean-sky transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-ocean-sky transition">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-ocean-sky transition">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-white">Contact Us</h4>
                <p className="text-neutral-gray text-sm">Email: info@eximly.com</p>
                <p className="text-neutral-gray text-sm mt-1">Phone: +1-800-EXIMLY</p>
              </div>
            </div>
            <div className="border-separator text-center text-neutral-gray text-xs">
              <p>&copy; {new Date().getFullYear()} Eximly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
