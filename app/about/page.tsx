import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-neutral-dark">About Eximly</h1>

        <div className="space-y-8 text-lg text-neutral-gray">
          <section>
            <h2 className="text-3xl font-bold mb-4 text-neutral-dark">Our Mission</h2>
            <p>
              Eximly is dedicated to simplifying import-export management for businesses of all sizes.
              We provide a modern, intuitive platform that streamlines shipment tracking, export handling,
              and logistics workflows.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-neutral-dark">What We Offer</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>Seamless shipment creation and management</li>
              <li>Support for domestic and international exports</li>
              <li>Dynamic workflows for export handling</li>
              <li>Real-time shipment tracking</li>
              <li>Secure authentication and data protection</li>
              <li>Clean, responsive user interface</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-neutral-dark">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>Fast & Efficient - Create shipments in less than 1 minute</li>
              <li>Global Support - Handle international exports with ease</li>
              <li>Secure & Safe - Password hashing, validation, and protected routes</li>
              <li>User-Friendly - Clean UI with consistent spacing and design</li>
              <li>Scalable - Dynamic routing system supports your growth</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-neutral-dark">Get Started</h2>
            <p>
              Ready to streamline your logistics? Join thousands of businesses using Eximly.
            </p>
            <Link href="/auth/login" className="btn-primary mt-4 inline-block">
              Get Started Now
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
