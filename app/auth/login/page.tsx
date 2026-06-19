'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
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
        <h1 className="text-3xl font-extrabold text-center mb-8 text-neutral-darkBlue">Login</h1>

        {error && (
          <div className="bg-status-danger bg-opacity-10 border border-status-danger text-status-danger px-4 py-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-neutral-darkBlue mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-neutral-darkBlue mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-sky/30 focus:border-ocean-sky transition text-neutral-dark"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ocean-sky hover:bg-ocean-deep text-white font-bold py-3.5 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-light text-center space-y-3">
          <p className="text-sm text-neutral-gray">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-ocean-sky font-bold hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-sm">
            <Link href="/auth/forgot-password" className="text-ocean-sky hover:underline font-semibold">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
