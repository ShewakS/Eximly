import type { Metadata } from 'next';
import './globals.css';
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-neutral-lightGray">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
