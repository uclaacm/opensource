import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: JSX.Element;
}

function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content="opensource at acm at ucla" />
        <meta name="description" content="open source at acm at ucla!" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />

        <title>open source at acm at ucla</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
