import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminAbout() {
  const [page, setPage] = useState({ whoWeAre: '', ourTeam: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = () => axios.get('/api/about').then((res) => setPage(res.data || { whoWeAre: '', ourTeam: '' }));

  useEffect(() => {
    refresh();
  }, []);

  const save = async () => {
    if (!page.whoWeAre.trim() || !page.ourTeam.trim()) {
      setMessage('Both sections are required.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/about', page, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('About page saved successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to save about content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">About Page Editor</h2>
          <p className="mt-1 text-sm text-slate-600">Update the public about sections for your website.</p>
        </div>

        {message && <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{message}</div>}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Who We Are</label>
            <textarea
              value={page.whoWeAre}
              onChange={(e) => setPage({ ...page, whoWeAre: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3"
              rows="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Our Team</label>
            <textarea
              value={page.ourTeam}
              onChange={(e) => setPage({ ...page, ourTeam: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3"
              rows="5"
            />
          </div>
          <button
            onClick={save}
            disabled={loading}
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
