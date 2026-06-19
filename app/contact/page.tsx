'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-neutral-dark">Contact Us</h1>
        <p className="text-xl text-center text-neutral-gray mb-12">
          Have questions? We'd love to hear from you. Get in touch with us!
        </p>

        <div className="grid-responsive-3">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Send us a message</h2>

            {submitted && (
              <div className="bg-status-success bg-opacity-10 border border-status-success text-status-success px-4 py-3 rounded-lg mb-6">
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
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
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-neutral-dark">Email</h3>
              <a href="mailto:info@eximly.com" className="text-primary-blue hover:underline text-lg">
                info@eximly.com
              </a>
            </div>

            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-neutral-dark">Phone</h3>
              <a href="tel:+18008349598" className="text-primary-blue hover:underline text-lg">
                +1-800-EXIMLY (839-6459)
              </a>
            </div>

            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-neutral-dark">Business Hours</h3>
              <p className="text-neutral-gray">
                Monday - Friday: 9:00 AM - 6:00 PM EST<br/>
                Saturday: 10:00 AM - 4:00 PM EST<br/>
                Sunday: Closed
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-neutral-dark">Address</h3>
              <p className="text-neutral-gray">
                Eximly HQ<br/>
                123 Logistics Drive<br/>
                San Francisco, CA 94105<br/>
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
