import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-5">
        <h2 className="text-3xl font-semibold text-center">Admin Login</h2>
        <p className="text-sm text-gray-600 text-center">Enter your credentials to manage rooms, activities, events, and the site logo.</p>
        {error && <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-red-700">{error}</div>}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="admin@example.com"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-accent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-accent px-4 py-2 text-white transition hover:bg-orange-500 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
