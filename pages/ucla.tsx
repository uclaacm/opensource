import { NextSeo } from 'next-seo';
import React from 'react';
import Layout from '../components/Layout';

function UCLA(): JSX.Element {
  return(
    <Layout>
      <div className='container'>
        <NextSeo
          title="contribute | open source at ACM at UCLA"
          description="get started by contributing to one of our projects"
          openGraph={{
            images: [{
              url: 'https://opensource.uclaacm.com/logo.png',
              width: 1200,
              height: 1200,
              alt: 'The ACM at UCLA logo',
            }],
            site_name: 'open source at ACM at UCLA',
          }}
        />
        <h1> ucla opensource</h1>
        <p style={{fontSize: '24px'}}>opensource projects by all ucla students. any project with the
        ucla-opensource tag will be available to work on.</p>
        <p style={{fontSize: '18px'}}>this page is currently a work in progress</p>
      </div>
    </Layout>
  );
}

export default UCLA;