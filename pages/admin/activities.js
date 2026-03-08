import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminActivities() {
  const [acts, setActs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: 0, duration: '', images: [] });
  const [editing, setEditing] = useState(null);

  const refresh = () => {
    axios.get('/api/activities').then((res) => setActs(res.data));
  };
  useEffect(() => { refresh(); }, []);

  const save = async () => {
    const token = localStorage.getItem('token');
    if (editing) {
      await axios.put(`/api/activities/${editing._id}`, form, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post('/api/activities', form, { headers: { Authorization: `Bearer ${token}` } });
    }
    setForm({ title: '', description: '', price: 0, duration: '', images: [] });
    setEditing(null);
    refresh();
  };
  const edit = (a) => {
    setEditing(a);
    setForm({
      title: a.title,
      description: a.description,
      price: a.price,
      duration: a.duration,
      images: a.images,
    });
  };
  const remove = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/activities/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    refresh();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Activities Manager</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{editing ? 'Edit Activity' : 'Add Activity'}</h3>
        <div className="space-y-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Image URLs comma separated"
            value={form.images.join(',')}
            onChange={(e) => setForm({ ...form, images: e.target.value.split(',') })}
            className="border p-2 w-full"
          />
          <button onClick={save} className="bg-accent text-white px-4 py-2 rounded">
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ title: '', description: '', price: 0, duration: '', images: [] }); }} className="ml-2 px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </div>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="border px-2">Title</th>
            <th className="border px-2">Price</th>
            <th className="border px-2">Duration</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {acts.map((a) => (
            <tr key={a._id}>
              <td className="border px-2">{a.title}</td>
              <td className="border px-2">{a.price}</td>
              <td className="border px-2">{a.duration}</td>
              <td className="border px-2 space-x-2">
                <button onClick={() => edit(a)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => remove(a._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
