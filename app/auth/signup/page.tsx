'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-neutral-lightGray px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-light p-8 md:p-10 transition duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-neutral-darkBlue">Create Account</h1>

        {error && (
          <div className="bg-status-danger bg-opacity-10 border border-status-danger text-status-danger px-4 py-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-bold text-neutral-darkBlue mb-1">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full px-3 py-2.5 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-bold text-neutral-darkBlue mb-1">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full px-3 py-2.5 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-neutral-darkBlue mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-neutral-darkBlue mb-1">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1234567890"
              className="w-full px-4 py-2.5 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-neutral-darkBlue mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-bold text-neutral-darkBlue mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-2.5 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ocean-sky hover:bg-ocean-deep text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-light text-center">
          <p className="text-sm text-neutral-gray">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-ocean-sky font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
