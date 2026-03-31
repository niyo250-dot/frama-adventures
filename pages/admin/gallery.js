import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminGallery() {
  const [imgs, setImgs] = useState([]);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = () => axios.get('/api/gallery').then((res) => setImgs(res.data));

  useEffect(() => {
    refresh();
  }, []);

  const add = async () => {
    if (!url.trim()) {
      setMessage('Please enter an image URL.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/gallery', { url }, { headers: { Authorization: `Bearer ${token}` } });
      setUrl('');
      setMessage('Image added to the gallery.');
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this gallery image?')) return;
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/gallery/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Image removed.');
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not delete image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Gallery Manager</h2>
          <p className="mt-1 text-sm text-slate-600">Keep your gallery images up to date and easy to manage.</p>
        </div>
        {message && <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{message}</div>}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              placeholder="Image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            <button
              onClick={add}
              disabled={loading}
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-60"
            >
              {loading ? 'Uploading…' : 'Upload'}
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {imgs.length === 0 && <p className="col-span-full text-center text-sm text-slate-500">No images yet. Add one to start the gallery.</p>}
          {imgs.map((img) => (
            <div key={img._id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <img src={img.url} alt="Gallery item" className="h-48 w-full object-cover" />
              <button
                onClick={() => remove(img._id)}
                className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
