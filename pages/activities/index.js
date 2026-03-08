import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityCard from '../../components/ActivityCard';

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('/api/activities').then((res) => setActivities(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Tours & Activities – FRAMA Nature Adventures</title>
      </Head>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Tours & Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((act) => (
            <ActivityCard key={act._id} activity={act} />
          ))}
        </div>
      </section>
    </>
  );
}
