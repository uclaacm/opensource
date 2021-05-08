import React from 'react';
import { Octokit } from "@octokit/core";
import { InferGetStaticPropsType } from 'next';
import GitHubEvent from '../components/GitHubEvent';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

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

const bufferBuffetProject = {
  name: "Buffer Buffet",
  description: "All of our projects are open-source! Literally, all of them.",
  repo: "https://github.com/uclaacm/buffer-buffet",
  link: "https://bufferbuffet.uclaacm.com/",
  image: "/buffer-buffet.png",
  alt: "buffer buffet landing splash",
}

function Home({numRepos, recentEvents}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
  <Layout>
    <div className="container">
      <h1>
        opensource at <a href="https://uclaacm.com">ACM at UCLA</a>
      </h1>

      <div className="row">
        <div className="col-6">
          <div className="card">
            <a href="https://github.com/uclaacm/" className="card-body">
              <h3>Projects &rarr;</h3>
              <p>All of our projects are open-source! Literally, all of them.</p>
            </a>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <a href="https://dev-pathways.netlify.app/" className="card-body">
              <h3>Learning &rarr;</h3>
              <p>We want to teach you how to contribute to OSS too!</p>
            </a>
          </div>
        </div>
      </div>
      <h2>featured project</h2>
      <ProjectCard {...bufferBuffetProject} />
      <h2>what we&apos;ve been doing recently...</h2>
      <p>
        repositories: {numRepos}
      </p>
      {
        recentEvents.map((event) => <GitHubEvent {...event} key={event.id} />)
      }
    </div>
  </Layout>
  )
}

export default Home
