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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          Create Account
        </h1>

        {error && (
          <div className="auth-error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First + Last Name row */}
          <div className="form-grid-2">
            <div>
              <label htmlFor="firstName" className="auth-label-sm">First Name</label>
              <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required placeholder="John" />
            </div>
            <div>
              <label htmlFor="lastName" className="auth-label-sm">Last Name</label>
              <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="auth-label-sm">Email Address</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="phone" className="auth-label-sm">Phone Number</label>
            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+1234567890" />
          </div>

          <div>
            <label htmlFor="password" className="auth-label-sm">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="At least 6 characters" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="auth-label-sm">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm your password" />
          </div>

          <button
            type="submit"
            id="signup-submit"
            disabled={loading}
            className="btn btn-primary btn-md w-full mt-4"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="text-sm text-neutral-gray">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-ocean-sky font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
