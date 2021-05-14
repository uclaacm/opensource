import { Octokit } from '@octokit/core';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import GitHubEvent from '../components/GitHubEvent';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

import projects from '../data/projects';

// TODO(mattxwang): can we resolve the "missing return type on func statement"
export const getStaticProps = async () => {
  // TODO(mattxwang): change the auth scope and get members, etc.
  // see: https://docs.github.com/en/rest/reference/orgs
  const octokit = new Octokit();
  const orgResponse = await octokit.request('GET /orgs/{org}', {
    org: 'uclaacm',
  });
  const numRepos = orgResponse.data.public_repos;

  const eventResponse = await octokit.request('GET /orgs/{org}/events', {
    org: 'uclaacm',
  });
  const recentEvents = eventResponse.data;

  return {
    props: {
      numRepos,
      recentEvents,
    },
    revalidate: 60,
  };
};

function Home({numRepos, recentEvents}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const linkProps = {
    rel: 'noopener noreferrer',
    target: '_blank',
  };
  return (
    <Layout>
      <div className="container">
        <h1>
        open source at <a href="https://uclaacm.com" {...linkProps}>ACM at UCLA</a>
        </h1>
        <hr />
        <p className="knockout-description">
        at the largest computer science community at UCLA,<br/> <b>we care about open-source.</b>
        </p>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <Link href="/projects">
                  <a>
                    <h3>Projects &rarr;</h3>
                    <p>All of our projects are open-source! Literally, all of them.</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <a href="https://github.com/uclaacm/" {...linkProps}>
                  <h3>Learning &rarr;</h3>
                  <p>Pick up the skills to write great software.</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <a href="https://github.com/uclaacm/" {...linkProps}>
                  <h3>Events &rarr;</h3>
                  <p>We love talking about open-source. Come talk with us!</p>
                </a>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <Link href="/contribute">
                  <a>
                    <h3>Contribute &rarr;</h3>
                    <p>Make your first pull request with us!</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-2" />

        <h2>featured project</h2>
        <ProjectCard project={projects[0]} />
        <h2>what we&apos;ve been doing recently...</h2>
        <p>
        repositories: {numRepos}
        </p>
        <div className="card">
          <div className="card-body">
            {
              recentEvents.map((event) => <GitHubEvent {...event} key={event.id} />)
            }
            <p>
            see more activity <a href="https://github.com/uclaacm/" {...linkProps}>on our org</a>!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
