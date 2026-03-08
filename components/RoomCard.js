import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RoomCard({ room }) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
      whileHover={{ scale: 1.02 }}
    >
      {room.images && room.images.length > 0 && (
        <img src={room.images[0]} alt={room.name} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
        <p className="text-gray-700 mb-4">{room.description}</p>
        <p className="font-semibold">${room.price}/night</p>
        <Link href="/book">
          <a className="inline-block mt-4 px-4 py-2 bg-accent text-white rounded-md">
            Book Now
          </a>
        </Link>
      </div>
    </motion.div>
  );
}
