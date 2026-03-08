import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPreview() {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">About FRAMA Nature Adventures</h2>
      <p className="mb-6">
        Nestled on the shores of Lake Burera, FRAMA Eco-Lodge offers a serene escape into Rwanda’s breathtaking natural beauty. 
      </p>
      <Link href="/about/who-we-are">
        <a className="text-accent font-semibold">Learn more →</a>
      </Link>
    </motion.section>
  );
}
