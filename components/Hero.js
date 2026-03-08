import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          FRAMA Nature Adventures – Discover Rwanda’s Hidden Eco Paradise
        </motion.h1>
        <div className="space-x-4">
          <a href="/book" className="px-6 py-3 bg-accent rounded-md font-semibold hover:bg-orange-500">
            Book Your Stay
          </a>
          <a href="/activities" className="px-6 py-3 bg-transparent border border-white rounded-md font-semibold hover:bg-white hover:text-dark">
            Explore Activities
          </a>
        </div>
      </div>
    </section>
  );
}
