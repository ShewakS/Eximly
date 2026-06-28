import type { Metadata } from 'next';
import './style.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Eximly - Import/Export Management',
  description: 'Simplify your logistics workflows with Eximly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased layout-shell">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
