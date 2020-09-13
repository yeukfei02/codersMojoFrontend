import React from 'react';
import Head from 'next/head';

function NextHead(): JSX.Element {
  return (
    <Head>
      <title>CodersMojo</title>
      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
  );
}

export default NextHead;
