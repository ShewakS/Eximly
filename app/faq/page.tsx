import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        'Click the "Login" button in the navbar, then select "Sign up". Fill in your name, email, and password (at least 6 characters), then click "Sign Up".',
    },
    {
      question: 'What is the difference between domestic and international exports?',
      answer:
        'Domestic exports are shipments within the same country, while international exports require additional documentation such as passport number, customs declaration ID, export license number, and shipping method.',
    },
    {
      question: 'How do I add a shipment?',
      answer:
        'Log in to your account, go to the Dashboard, and click the "Add Shipment" button. Fill in the required information, select the export type, and submit.',
    },
    {
      question: 'Can I edit or delete a shipment?',
      answer:
        'You can view and delete shipments from the dashboard or shipment detail page. Edit functionality can be added based on your requirements.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, we use industry-standard bcrypt hashing for passwords, input validation, and protected routes to keep your data secure.',
    },
    {
      question: 'How long does it take to create a shipment?',
      answer:
        'You can create a shipment in less than 1 minute with our streamlined interface.',
    },
    {
      question: 'What shipping methods are available?',
      answer:
        'For international exports, you can choose between Air or Sea shipping methods.',
    },
    {
      question: 'Is there a mobile app?',
      answer:
        'Currently, Eximly is a web-based application. A mobile app is planned for future releases.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'Click the "Forgot password?" link on the login page. This feature will be available soon.',
    },
    {
      question: 'Who can I contact for support?',
      answer:
        'You can reach us at info@eximly.com or use the contact form on our Contact page.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-neutral-dark">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold mb-3 text-neutral-dark">
                {index + 1}. {faq.question}
              </h3>
              <p className="text-neutral-gray">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary-blue text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg mb-6">
            We're here to help! Get in touch with our support team.
          </p>
          <Link href="/contact" className="btn-primary bg-accent-pink hover:bg-accent-orange">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
