import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminGallery() {
  const [imgs, setImgs] = useState([]);
  const [url, setUrl] = useState('');

  const refresh = () => {
    axios.get('/api/gallery').then((res) => setImgs(res.data));
  };
  useEffect(() => { refresh(); }, []);

  const add = async () => {
    const token = localStorage.getItem('token');
    await axios.post('/api/gallery', { url }, { headers: { Authorization: `Bearer ${token}` } });
    setUrl('');
    refresh();
  };
  const remove = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/gallery/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    refresh();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Gallery Manager</h2>
      <div className="mb-4">
        <input
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={add} className="mt-2 bg-accent text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {imgs.map((img) => (
          <div key={img._id} className="relative">
            <img src={img.url} className="w-full h-32 object-cover" />
            <button
              onClick={() => remove(img._id)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
