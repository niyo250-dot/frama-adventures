import AdminLayout from '../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const emptyForm = { title: '', description: '', date: '', location: '', price: 0, images: [] };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    axios.get('/api/events').then((res) => setEvents(res.data));
  };

  useEffect(() => {
    refresh();
  }, []);

  const save = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.date || !form.location.trim()) {
      setMessage('Title, description, date, and location are required.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const payload = { ...form, images: form.images.filter(Boolean) };
      if (editing) {
        await axios.put(`/api/events/${editing._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('Event updated successfully.');
      } else {
        await axios.post('/api/events', payload, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('Event created successfully.');
      }
      setForm(emptyForm);
      setEditing(null);
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to save event.');
    } finally {
      setLoading(false);
    }
  };

  const edit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      date: new Date(item.date).toISOString().slice(0, 10),
      location: item.location,
      price: item.price,
      images: item.images || [],
    });
    setMessage('');
  };

  const remove = async (id) => {
    if (!confirm('Remove this event?')) return;
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Event deleted.');
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to delete event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Events Manager</h2>
            <p className="mt-1 text-sm text-slate-600">Create, edit, or remove events in a single admin dashboard.</p>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setForm(emptyForm);
              setMessage('');
            }}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            New event
          </button>
        </div>

        {message && <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Event' : 'Add Event'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  rows="4"
                  placeholder="Event details"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Location</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                    placeholder="Event location"
                  />
                </div>
              </div>
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
                  {loading ? 'Saving…' : editing ? 'Update Event' : 'Create Event'}
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
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.length === 0 && <p className="text-sm text-slate-500">No events have been added yet.</p>}
              {events.map((item) => (
                <div key={item._id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">${item.price}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => edit(item)} className="text-blue-600 hover:underline text-sm">
                      Edit
                    </button>
                    <button onClick={() => remove(item._id)} className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
