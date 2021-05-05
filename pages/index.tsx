import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/core";
import Layout from '../components/Layout';

function Home(): JSX.Element {
  const [acmRepos, setACMRepos] = useState(0);

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

  return (
  <Layout>
    <div className="container">
      <h1 className="title">
        opensource at <a href="https://uclaacm.com">ACM at UCLA</a>
      </h1>

      <p>
        repositories: {acmRepos}
      </p>

      <div className="grid">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className="card">
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className="card"
        >
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="card"
        >
          <h3>Deploy &rarr;</h3>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </div>
    </div>
  </Layout>
  )
}

export default Home
