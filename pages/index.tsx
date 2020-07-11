import React from 'react';
import Head from 'next/head';

import ThreeExample from '../components/ThreeExample';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tate A.F.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThreeExample />
    </>
  );
}
