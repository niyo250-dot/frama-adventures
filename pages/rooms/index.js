import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../../components/RoomCard';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms').then((res) => setRooms(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Rooms & Accommodation – FRAMA Nature Adventures</title>
      </Head>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Rooms & Accommodation</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </section>
    </>
  );
}
