export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-neutral-dark">Privacy Policy</h1>

        <div className="space-y-8 text-lg text-neutral-gray">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">1. Introduction</h2>
            <p>
              Eximly ("we," "us," or "our") operates the Eximly website and application.
              This page informs you of our policies regarding the collection, use, and disclosure
              of personal data when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">2. Data Collection</h2>
            <p>
              We collect information you provide directly, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Name and email address during account creation</li>
              <li>Shipment and logistics information</li>
              <li>Payment information (if applicable)</li>
              <li>Communication and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">3. Data Usage</h2>
            <p>
              We use collected data to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Provide and maintain our Service</li>
              <li>Process transactions</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your inquiries</li>
              <li>Improve our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">4. Security</h2>
            <p>
              The security of your data is important to us. We use industry-standard encryption
              and bcrypt hashing for passwords. However, no method of transmission over the internet
              is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">5. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br/>
              Email: privacy@eximly.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
