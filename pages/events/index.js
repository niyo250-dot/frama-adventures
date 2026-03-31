import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Events & Adventures</h1>
          <p className="mt-3 text-slate-600">Browse our latest outdoor events, locations, and booking-ready offers.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event._id} className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200">
              {event.images?.[0] && (
                <img src={event.images[0]} alt={event.title} className="h-56 w-full object-cover" />
              )}
              <div className="p-6">
                <p className="text-sm font-semibold uppercase text-accent">{new Date(event.date).toLocaleDateString()}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">{event.title}</h2>
                <p className="mt-3 text-slate-600 line-clamp-3">{event.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                  <span>{event.location}</span>
                  <span className="font-semibold text-slate-900">${event.price}</span>
                </div>
              </div>
            </article>
          ))}
          {events.length === 0 && <p className="col-span-full text-center text-slate-500">No events are available right now.</p>}
        </div>
      </div>
    </div>
  );
}
