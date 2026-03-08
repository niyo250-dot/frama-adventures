import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ActivityCard({ activity }) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
      whileHover={{ scale: 1.02 }}
    >
      {activity.images && activity.images.length > 0 && (
        <img src={activity.images[0]} alt={activity.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
        <p className="text-gray-700 mb-4">{activity.description}</p>
        <p className="font-semibold">${activity.price}</p>
        <p className="text-sm">Duration: {activity.duration}</p>
        <Link href="/book" className="inline-block mt-4 px-4 py-2 bg-accent text-white rounded-md">
            Book Activity
        </Link>
      </div>
    </motion.div>
  );
}
