import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GalleryPreview() {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="h-32 bg-gray-200"></div>
        <div className="h-32 bg-gray-200"></div>
        <div className="h-32 bg-gray-200"></div>
        <div className="h-32 bg-gray-200"></div>
      </div>
      <div className="text-center mt-4">
        <Link href="/gallery" className="text-accent font-semibold">View full gallery →</Link>
      </div>
    </motion.section>
  );
}
