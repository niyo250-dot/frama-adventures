import Head from 'next/head';
import BookingForm from '../components/BookingForm';

export default function Book() {
  return (
    <>
      <Head>
        <title>Book – FRAMA Nature Adventures</title>
      </Head>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Make a Booking</h1>
        <BookingForm />
      </section>
    </>
  );
}
