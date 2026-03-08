import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ActivitiesPreview() {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Popular Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">Canoe Trip</div>
        <div className="bg-white shadow-md rounded-lg p-4">Volcano Hike</div>
        <div className="bg-white shadow-md rounded-lg p-4">Bird Watching</div>
      </div>
      <div className="text-center mt-4">
        <Link href="/activities">
          <a className="text-accent font-semibold">See all activities →</a>
        </Link>
      </div>
    </motion.section>
  );
}
