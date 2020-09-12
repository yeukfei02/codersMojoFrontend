import React from 'react';
import Head from 'next/head';
import CustomDrawer from '../customDrawer/CustomDrawer';

function MainView(): JSX.Element {
  return (
    <div>
      <Head>
        <title>CodersMojo</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <CustomDrawer />
    </div>
  );
}

export default MainView;
