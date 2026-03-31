import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Logo', href: '/admin/logo' },
  { label: 'Rooms', href: '/admin/rooms' },
  { label: 'Activities', href: '/admin/activities' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Gallery', href: '/admin/gallery' },
  { label: 'About', href: '/admin/about' },
  { label: 'Bookings', href: '/admin/bookings' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    axios
      .get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setReady(true))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/admin/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  if (!ready) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Checking access...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-72 lg:w-80 bg-white border-r border-slate-200 shadow-sm">
          <div className="px-6 py-6 border-b border-slate-200">
            <div className="text-2xl font-semibold">Admin Panel</div>
            <p className="mt-2 text-sm text-slate-500">Manage your site content and branding in one place.</p>
          </div>
          <div className="px-4 py-5 space-y-1">
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active ? 'bg-accent text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="px-6 py-5 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
