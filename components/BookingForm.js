import { useState } from 'react';
import axios from 'axios';

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', date: '', guests: 1, message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="max-w-xl mx-auto space-y-4" onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
        className="w-full border p-2"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        required
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        type="text"
        placeholder="Phone"
        className="w-full border p-2"
        required
      />
      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        type="date"
        className="w-full border p-2"
        required
      />
      <input
        name="guests"
        value={form.guests}
        onChange={handleChange}
        type="number"
        min="1"
        className="w-full border p-2"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        className="w-full border p-2"
        rows="4"
      />
      <button type="submit" className="px-4 py-2 bg-accent text-white rounded-md">
        Submit
      </button>
      {status === 'success' && <p className="text-green-600">Booking submitted!</p>}
      {status === 'error' && <p className="text-red-600">Failed to submit booking.</p>}
    </form>
  );
}
