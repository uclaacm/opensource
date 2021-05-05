import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import GitHubEvent from '../components/GitHubEvent';
import Layout from '../components/Layout';

function Home(): JSX.Element {
  const [acmRepos, setACMRepos] = useState(0);
  const [recentActions, setRecentActions] = useState([]);

  useEffect(()=> {
    // TODO(mattxwang): change the auth scope and get members, etc.
    // see: https://docs.github.com/en/rest/reference/orgs
    const octokit = new Octokit();
    async function getGHRepoCounts() {
      const response = await octokit.request("GET /orgs/{org}", {
        org: "uclaacm",
      })
      setACMRepos(response.data.public_repos);
    }
    getGHRepoCounts();
  }, [])

  useEffect(()=> {
    const octokit = new Octokit();
    async function getGHRepoCounts() {
      const response = await octokit.request("GET /orgs/{org}/events", {
        org: "uclaacm",
      })
      setRecentActions(response.data);
    }
    getGHRepoCounts();
  }, [])

  return (
  <Layout>
    <div className="container">
      <h1>
        opensource at <a href="https://uclaacm.com">ACM at UCLA</a>
      </h1>

      <p>
        repositories: {acmRepos}
      </p>

      <div className="card">
        <a href="https://nextjs.org/docs" className="card-body">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>
      </div>
      <h2>what we&apos;ve been doing recently...</h2>
      <div>
        {
          recentActions.map((event) => <GitHubEvent {...event} key={event.id} />)
        }
      </div>
    </div>
  </Layout>
  )
}

export default Home
