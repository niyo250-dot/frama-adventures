import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminBookings() {
  const [bks, setBks] = useState([]);

  const refresh = () => {
    const token = localStorage.getItem('token');
    axios
      .get('/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBks(res.data));
  };
  useEffect(() => { refresh(); }, []);

  const toggle = async (id, current) => {
    const token = localStorage.getItem('token');
    await axios.put('/api/bookings', { id, confirmed: !current }, { headers: { Authorization: `Bearer ${token}` } });
    refresh();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Booking Manager</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th classRole="border px-2">Email</th>
            <th className="border px-2">Date</th>
            <th className="border px-2">Guests</th>
            <th className="border px-2">Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {bks.map((b) => (
            <tr key={b._id}>
              <td className="border px-2">{b.name}</td>
              <td className="border px-2">{b.email}</td>
              <td className="border px-2">{new Date(b.date).toLocaleDateString()}</td>
              <td className="border px-2">{b.guests}</td>
              <td className="border px-2">
                <button onClick={() => toggle(b._id, b.confirmed)} className="text-blue-600">
                  {b.confirmed ? 'Yes' : 'No'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
