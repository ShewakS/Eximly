'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

// Material UI Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send message. Please try again.');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 6 seconds
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const infoCards = [
    {
      icon: <EmailIcon className="text-ocean-sky" />,
      title: 'Email',
      content: (
        <a href="mailto:info@eximly.com" className="text-ocean-sky hover:underline font-medium">
          info@eximly.com
        </a>
      ),
    },
    {
      icon: <PhoneIcon className="text-ocean-sky" />,
      title: 'Phone',
      content: (
        <a href="tel:+18008349598" className="text-ocean-sky hover:underline font-medium">
          +1-800-EXIMLY (839-6459)
        </a>
      ),
    },
    {
      icon: <AccessTimeIcon className="text-ocean-sky" />,
      title: 'Business Hours',
      content: (
        <p className="text-neutral-gray text-sm leading-relaxed">
          Mon – Fri: 9:00 AM – 6:00 PM EST<br />
          Saturday: 10:00 AM – 4:00 PM EST<br />
          Sunday: Closed
        </p>
      ),
    },
    {
      icon: <LocationOnIcon className="text-ocean-sky" />,
      title: 'Address',
      content: (
        <p className="text-neutral-gray text-sm leading-relaxed">
          Eximly HQ<br />
          123 Logistics Drive<br />
          San Francisco, CA 94105<br />
          United States
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-12">
      <div className="container-max">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-darkBlue mb-4">
            Contact Us
          </h1>
          <p className="text-neutral-gray text-base leading-relaxed">
            Have questions or need assistance? We'd love to hear from you.
            Our team is ready to help.
          </p>
        </div>

        {/* Two-column layout: Form + Info cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Contact Form — max width constrained on wide screens */}
          <div className="card max-w-xl w-full mx-auto lg:mx-0">
            <h2 className="text-2xl font-bold mb-6 text-neutral-darkBlue">Send us a message</h2>

            {submitted && (
              <div className="bg-status-success/10 border border-status-success text-status-success px-4 py-3 rounded-lg mb-6 text-sm font-medium flex items-center gap-2">
                <span>✓</span>
                <span>Thank you! We'll get back to you soon.</span>
              </div>
            )}

            {error && (
              <div className="bg-status-danger/10 border border-status-danger text-status-danger px-4 py-3 rounded-lg mb-6 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-bold text-neutral-darkBlue mb-2">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-bold text-neutral-darkBlue mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-bold text-neutral-darkBlue mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info Cards — stacked with space-y-4 (P3: no individual mb-6) */}
          <div className="space-y-4">
            {infoCards.map((card) => (
              <div key={card.title} className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-ocean-sky/10 flex items-center justify-center flex-shrink-0 mt-1">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-darkBlue mb-1">{card.title}</h3>
                  {card.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
