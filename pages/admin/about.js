import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminAbout() {
  const [page, setPage] = useState({ whoWeAre: '', ourTeam: '' });

  const refresh = () => {
    axios.get('/api/about').then((res) => setPage(res.data));
  };
  useEffect(() => { refresh(); }, []);

  const save = async () => {
    const token = localStorage.getItem('token');
    await axios.post('/api/about', page, { headers: { Authorization: `Bearer ${token}` } });
    alert('Saved');
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">About Page Editor</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Who We Are</h3>
          <textarea
            value={page.whoWeAre}
            onChange={(e) => setPage({ ...page, whoWeAre: e.target.value })}
            className="w-full border p-2"
            rows="4"
          />
        </div>
        <div>
          <h3 className="font-semibold">Our Team</h3>
          <textarea
            value={page.ourTeam}
            onChange={(e) => setPage({ ...page, ourTeam: e.target.value })}
            className="w-full border p-2"
            rows="4"
          />
        </div>
        <button onClick={save} className="bg-accent text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </AdminLayout>
  );
}
