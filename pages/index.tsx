import React from 'react';
import { Octokit } from "@octokit/core";
import { InferGetStaticPropsType } from 'next'
import GitHubEvent from '../components/GitHubEvent';
import Layout from '../components/Layout';

// TODO(mattxwang): can we resolve the "missing return type on func statement"
export const getStaticProps = async () => {
  // TODO(mattxwang): change the auth scope and get members, etc.
  // see: https://docs.github.com/en/rest/reference/orgs
  const octokit = new Octokit();
  const orgResponse = await octokit.request("GET /orgs/{org}", {
    org: "uclaacm",
  });
  const numRepos = orgResponse.data.public_repos;

  const eventResponse = await octokit.request("GET /orgs/{org}/events", {
    org: "uclaacm",
  });
  const recentEvents = eventResponse.data;

  return {
    props: {
      numRepos,
      recentEvents
    },
    revalidate: 60,
  }
}

function Home({numRepos, recentEvents}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {

  return (
  <Layout>
    <div className="container">
      <h1>
        opensource at <a href="https://uclaacm.com">ACM at UCLA</a>
      </h1>

      <div className="card">
        <a href="https://nextjs.org/docs" className="card-body">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>
      </div>
      <div>
      <h2>what we&apos;ve been doing recently...</h2>
      <p>
        repositories: {numRepos}
      </p>
      {
        recentEvents.map((event) => <GitHubEvent {...event} key={event.id} />)
      }
    </div>
    </div>
  </Layout>
  )
}

export default Home
