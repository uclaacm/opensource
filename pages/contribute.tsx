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
              url: 'https://opensource.uclaacm.com/logo.png',
              width: 1200,
              height: 1200,
              alt: 'The ACM at UCLA logo',
            }],
            site_name: 'open source at ACM at UCLA',
          }}
        />
        <h1>
          Contribute to open source
        </h1>
        <p>
          Anyone can contribute to open source! You do not need coding experience.
        </p>
        <ol>
          <li><b><a href="https://wiki.openstreetmap.org/wiki/BruinMappers">BruinMappers</a></b>: student-run mapping club for UCLA campus and its surrounding area. Contribute by adding information about a place, or by taking photos.</li>
          <li><b><a href="https://en.wikipedia.org/wiki/Wikipedia:WikiProject_University_of_California/Los_Angeles">WikiProject UCLA</a></b>: contribute by knowledge and enriching articles.</li>
          <li><b><a href="/projects">Pull-requests</a></b>: Contribute by adding, reviewing, or improving code of one of ACM projects.</li>
        </ol>
      </div>
    </Layout>
  );
}

export default Contribute;
