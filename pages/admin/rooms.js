import AdminLayout from '../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, capacity: 0, images: [] });
  const [editing, setEditing] = useState(null);

  const refresh = () => {
    axios.get('/api/rooms').then((res) => setRooms(res.data));
  };

  useEffect(() => {
    refresh();
  }, []);

  const save = async () => {
    const token = localStorage.getItem('token');
    if (editing) {
      await axios.put(`/api/rooms/${editing._id}`, form, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post('/api/rooms', form, { headers: { Authorization: `Bearer ${token}` } });
    }
    setForm({ name: '', description: '', price: 0, capacity: 0, images: [] });
    setEditing(null);
    refresh();
  };

  const edit = (r) => {
    setEditing(r);
    setForm({
      name: r.name,
      description: r.description,
      price: r.price,
      capacity: r.capacity,
      images: r.images,
    });
  };

  const remove = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/rooms/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    refresh();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Rooms Manager</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{editing ? 'Edit Room' : 'Add Room'}</h3>
        <div className="space-y-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
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
            <button onClick={() => { setEditing(null); setForm({ name: '', description: '', price: 0, capacity: 0, images: [] }); }} className="ml-2 px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </div>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Price</th>
            <th className="border px-2">Capacity</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r._id}>
              <td className="border px-2">{r.name}</td>
              <td className="border px-2">{r.price}</td>
              <td className="border px-2">{r.capacity}</td>
              <td className="border px-2 space-x-2">
                <button onClick={() => edit(r)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => remove(r._id)} className="text-red-600">
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
