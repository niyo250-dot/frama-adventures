import Head from 'next/head';
import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import RoomsPreview from '../components/RoomsPreview';
import ActivitiesPreview from '../components/ActivitiesPreview';
import GalleryPreview from '../components/GalleryPreview';
import Testimonials from '../components/Testimonials';
import BookingCTA from '../components/BookingCTA';

export default function Home() {
  return (
    <>
      <Head>
        <title>FRAMA Nature Adventures – Discover Rwanda’s Hidden Eco Paradise</title>
        <meta name="description" content="Premium eco-lodge and tours in Rwanda at Lake Burera" />
      </Head>
      <Hero />
      <main className="space-y-20 mt-20">
        <AboutPreview />
        <RoomsPreview />
        <ActivitiesPreview />
        <GalleryPreview />
        <Testimonials />
        <BookingCTA />
      </main>
    </>
  );
}
