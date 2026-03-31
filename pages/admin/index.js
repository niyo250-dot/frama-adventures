import Head from 'next/head';
import AdminLayout from '../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, rooms: 0, activities: 0, images: 0, events: 0 });

  useEffect(() => {
    axios.get('/api/admin/stats').then((res) => setStats(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="mt-2 text-sm text-slate-600">Quick stats and navigation for your admin workflow.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Bookings</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{stats.bookings}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Rooms</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{stats.rooms}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Activities</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{stats.activities}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Events</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{stats.events}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Gallery Images</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{stats.images}</div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="/admin/rooms" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-accent hover:ring-1 hover:ring-accent/10">
              <div className="font-semibold text-slate-900">Manage Rooms</div>
              <p className="mt-2 text-sm text-slate-600">Create, edit and delete room inventory.</p>
            </a>
            <a href="/admin/activities" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-accent hover:ring-1 hover:ring-accent/10">
              <div className="font-semibold text-slate-900">Manage Activities</div>
              <p className="mt-2 text-sm text-slate-600">Update upcoming tours and offers.</p>
            </a>
            <a href="/admin/events" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-accent hover:ring-1 hover:ring-accent/10">
              <div className="font-semibold text-slate-900">Manage Events</div>
              <p className="mt-2 text-sm text-slate-600">Add seasonal events and special experiences.</p>
            </a>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
