import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <a href="/admin" className="font-bold mr-4">
          Dashboard
        </a>
        <a href="/admin/rooms" className="mr-4">
          Rooms
        </a>
        <a href="/admin/activities" className="mr-4">
          Activities
        </a>
        <a href="/admin/gallery" className="mr-4">
          Gallery
        </a>
        <a href="/admin/about" className="mr-4">
          About
        </a>
        <a href="/admin/bookings" className="mr-4">
          Bookings
        </a>
      </nav>
      <div className="p-8">{children}</div>
    </div>
  );
}
