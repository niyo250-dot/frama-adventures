import AdminLayout from '../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const emptyForm = { name: '', description: '', price: 0, capacity: 0, images: [] };

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = () => axios.get('/api/rooms').then((res) => setRooms(res.data));

  useEffect(() => {
    refresh();
  }, []);

  const save = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      setMessage('Name and description are required.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const payload = { ...form, images: form.images.filter(Boolean) };
      if (editing) {
        await axios.put(`/api/rooms/${editing._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('Room updated successfully.');
      } else {
        await axios.post('/api/rooms', payload, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('Room created successfully.');
      }
      setForm(emptyForm);
      setEditing(null);
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to save room.');
    } finally {
      setLoading(false);
    }
  };

  const edit = (r) => {
    setEditing(r);
    setForm({
      name: r.name,
      description: r.description,
      price: r.price,
      capacity: r.capacity,
      images: r.images || [],
    });
    setMessage('');
  };

  const remove = async (id) => {
    if (!confirm('Delete this room?')) return;
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/rooms/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Room deleted successfully.');
      refresh();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to delete room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Rooms Manager</h2>
          <p className="mt-1 text-sm text-slate-600">Update rooms and accommodations without leaving the admin panel.</p>
        </div>
        {message && <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Room' : 'Add Room'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Room name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                  rows="4"
                  placeholder="Room description"
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
                  <label className="block text-sm font-medium text-slate-700">Capacity</label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                    placeholder="Guests"
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
                  {loading ? 'Saving…' : editing ? 'Update Room' : 'Create Room'}
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
            <h3 className="text-lg font-semibold mb-4">Rooms List</h3>
            <div className="space-y-4">
              {rooms.length === 0 && <p className="text-sm text-slate-500">No rooms are available yet.</p>}
              {rooms.map((r) => (
                <div key={r._id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{r.name}</h4>
                      <p className="text-sm text-slate-600">${r.price} • {r.capacity} guests</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => edit(r)} className="text-blue-600 hover:underline text-sm">
                        Edit
                      </button>
                      <button onClick={() => remove(r._id)} className="text-red-600 hover:underline text-sm">
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
