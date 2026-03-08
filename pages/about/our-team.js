import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OurTeam() {
  const [text, setText] = useState('');
  useEffect(() => {
    axios.get('/api/about').then((res) => setText(res.data.ourTeam || ''));
  }, []);

  return (
    <>
      <Head>
        <title>Our Team – FRAMA Nature Adventures</title>
      </Head>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Our Team</h1>
        <p>{text}</p>
      </section>
    </>
  );
}
