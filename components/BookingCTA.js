import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BookingCTA() {
  return (
    <motion.section
      className="bg-primary text-white py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to experience FRAMA?</h2>
        <Link href="/book" className="px-8 py-3 bg-accent rounded-md text-dark font-semibold hover:bg-orange-500">
            Book Now
        </Link>
      </div>
    </motion.section>
  );
}
