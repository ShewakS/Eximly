'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Link from 'next/link';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') || false;

  return (
    <div className="min-h-full flex flex-col bg-neutral-lightGray">
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && (
        <footer className="bg-neutral-footer text-white py-12 border-t border-white/10 mt-auto">
          <div className="container-max px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div className="border-t border-white/5 mt-10 pt-8 text-center text-neutral-gray text-xs">
              <p>&copy; {new Date().getFullYear()} Eximly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
