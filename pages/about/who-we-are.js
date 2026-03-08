import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WhoWeAre() {
  const [text, setText] = useState('');
  useEffect(() => {
    axios.get('/api/about').then((res) => setText(res.data.whoWeAre || ''));
  }, []);

  return (
    <>
      <Head>
        <title>Who We Are – FRAMA Nature Adventures</title>
      </Head>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Who We Are</h1>
        <p>{text}</p>
      </section>
    </>
  );
}
