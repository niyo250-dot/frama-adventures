import AdminLayout from '../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminLogo() {
  const [logoUrl, setLogoUrl] = useState('');
  const [currentLogo, setCurrentLogo] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/settings').then((res) => {
      const url = res.data?.logoUrl || '';
      setLogoUrl(url);
      setCurrentLogo(url);
    });
  }, []);

  const saveLogo = async () => {
    if (!logoUrl.trim()) {
      setMessage('Please paste a logo URL or upload an image.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/settings', { logoUrl }, { headers: { Authorization: `Bearer ${token}` } });
      setCurrentLogo(res.data.logoUrl);
      setMessage('Logo updated successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to save logo.');
    } finally {
      setLoading(false);
    }
  };

  const deleteLogo = async () => {
    if (!confirm('Delete the current logo?')) return;
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/settings', { headers: { Authorization: `Bearer ${token}` } });
      setLogoUrl('');
      setCurrentLogo('');
      setMessage('Logo deleted successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to delete logo.');
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Logo Manager</h2>
          <p className="mt-2 text-sm text-slate-600">Upload, preview, replace, or remove the site logo.</p>
        </div>

        {message && <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-800">Logo URL</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Paste image URL or upload a new file"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-accent focus:outline-none"
            />
            <label className="block text-sm font-medium text-slate-800">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm text-slate-600" />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveLogo}
                disabled={loading}
                className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-60"
              >
                {loading ? 'Saving…' : 'Save Logo'}
              </button>
              <button
                onClick={deleteLogo}
                disabled={loading || !currentLogo}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
              >
                Delete Logo
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Current Logo</h3>
            {currentLogo ? (
              <div className="mt-4 flex items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <img src={currentLogo} alt="Current logo" className="max-h-40 object-contain" />
              </div>
            ) : (
              <div className="mt-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                No logo is currently set.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
