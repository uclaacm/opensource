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
        <h1>have you wanted to work on projects used by ucla students??
          here are all the projects you can satsify your cravings with!
          Any project with the ucla-opensource topic tag will be available to work on.</h1>
        <h6>this page is currently a work in progress</h6>
      </div>
    </Layout>
  );
}

export default UCLA;