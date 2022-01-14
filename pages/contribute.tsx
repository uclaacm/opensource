import { NextSeo } from 'next-seo';
import React from 'react';
import Layout from '../components/Layout';

function Contribute(): JSX.Element {
  return (
    <Layout>
      <div className="container">
        <NextSeo
          title="contribute | open source at ACM at UCLA"
          description="get started by contributing to one of our projects"
          openGraph={{
            images: [{
              url: 'https://www.uclaacm.com/images/logo.png',
              width: 1200,
              height: 1200,
              alt: 'The ACM at UCLA logo',
            }],
            site_name: 'open source at ACM at UCLA',
          }}
        />
        <h1>
          get started
        </h1>
      </div>
    </Layout>
  );
}

export default Contribute;
