import Head from 'next/head';
import AdminLayout from '../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, rooms: 0, activities: 0, images: 0 });

  useEffect(() => {
    axios.get('/api/admin/stats').then((res) => setStats(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <AdminLayout>
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow rounded">Total Bookings: {stats.bookings}</div>
          <div className="bg-white p-4 shadow rounded">Rooms: {stats.rooms}</div>
          <div className="bg-white p-4 shadow rounded">Activities: {stats.activities}</div>
          <div className="bg-white p-4 shadow rounded">Gallery Images: {stats.images}</div>
        </div>
      </AdminLayout>
    </>
  );
}
