import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const emptyForm = { title: '', description: '', price: 0, duration: '', images: [] };

export default function AdminActivities() {
  const [acts, setActs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = () => axios.get('/api/activities').then((res) => setActs(res.data));

  useEffect(() => {
    refresh();
  }, []);

  const save = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.duration.trim()) {
      setMessage('Title, description, and duration are required.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const payload = { ...form, images: form.images.filter(Boolean) };
      if (editing) {
        await axios.put(`/api/activities/${editing._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('Activity updated successfully.');
      } else {
        await axios.post('/api/activities', payload, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('Activity created successfully.');
      }
      setForm(emptyForm);
      setEditing(null);
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to save activity.');
    } finally {
      setLoading(false);
    }
  };

  const edit = (a) => {
    setEditing(a);
    setForm({
      title: a.title,
      description: a.description,
      price: a.price,
      duration: a.duration,
      images: a.images || [],
    });
    setMessage('');
  };

  const remove = async (id) => {
    if (!confirm('Delete this activity?')) return;
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/activities/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Activity removed.');
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to delete activity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Activities Manager</h2>
          <p className="mt-1 text-sm text-slate-600">Add or update experiences that appear on the activities page.</p>
        </div>
        {message && <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Activity' : 'Add Activity'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Activity title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  rows="4"
                  placeholder="Brief details about the activity"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Price</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Duration</label>
                  <input
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                    placeholder="2 hours"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Image URLs</label>
                <input
                  value={form.images.join(',')}
                  onChange={(e) => setForm({ ...form, images: e.target.value.split(',') })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Comma separated URLs"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={save}
                  disabled={loading}
                  className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-60"
                >
                  {loading ? 'Saving…' : editing ? 'Update Activity' : 'Create Activity'}
                </button>
                {editing && (
                  <button
                    onClick={() => {
                      setEditing(null);
                      setForm(emptyForm);
                      setMessage('');
                    }}
                    type="button"
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Existing Activities</h3>
            <div className="space-y-4">
              {acts.length === 0 && <p className="text-sm text-slate-500">No activities were found.</p>}
              {acts.map((a) => (
                <div key={a._id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{a.title}</h4>
                      <p className="text-sm text-slate-600">{a.duration} • ${a.price}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => edit(a)} className="text-blue-600 hover:underline text-sm">
                        Edit
                      </button>
                      <button onClick={() => remove(a._id)} className="text-red-600 hover:underline text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
