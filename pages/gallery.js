import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/gallery').then((res) => setImages(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Gallery – FRAMA Nature Adventures</title>
      </Head>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Gallery</h1>
        <GalleryGrid images={images} />
      </section>
    </>
  );
}
