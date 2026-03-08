import { motion } from 'framer-motion';

export default function Testimonials() {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">What Our Guests Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="italic">“Amazing place, loved the tranquility!”</p>
          <p className="mt-4 font-semibold">– Jane Doe</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="italic">“The tours were unforgettable.”</p>
          <p className="mt-4 font-semibold">– John Smith</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="italic">“Highly recommend FRAMA Eco-Lodge.”</p>
          <p className="mt-4 font-semibold">– Alice Brown</p>
        </div>
      </div>
    </motion.section>
  );
}
