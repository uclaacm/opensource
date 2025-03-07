import { Octokit } from '@octokit/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import React from 'react';
import ELink from '../components/ELink';
import GitHubEventComponent from '../components/GitHubEvent';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { Project, getProjects, getGithubColors, GitHubEvent } from '../util';

function getRandomProj(projects: Project[]) {
  return Math.floor(Math.random() * projects.length);
}

export default function Home({
  numRepos,
  recentEvents,
  projects,
  githubColors,
  projNumToDisplay,
  randomProject,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Layout>
      <div className="container">
        <NextSeo
          title="open source at ACM at UCLA"
          description="at the largest computer science community at UCLA, we care about open-source"
          openGraph={{
            images: [
              {
                url: 'https://opensource.uclaacm.com/logo.png',
                width: 1200,
                height: 1200,
                alt: 'The ACM at UCLA logo',
              },
            ],
            site_name: 'open source at ACM at UCLA',
          }}
        />
        <h1>open source at UCLA</h1>
        <hr />
        <p className="knockout-description">
          maintained by <ELink link="https://uclaacm.com">ACM at UCLA</ELink>,
          the largest computer science community at UCLA
        </p>

        <div className="row">
          <div className="col-6 col-mb-12">
            <div className="card">
              <div className="card-body">
                <Link href="/projects">
                  <h3>Projects &rarr;</h3>
                  <p>Check out current UCLA open source projects!</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6 col-mb-12">
            <div className="card">
              <div className="card-body">
                <ELink link="https://dev-pathways.netlify.app/">
                  <h3>Learning &rarr;</h3>
                  <p>Pick up the skills to write great software!</p>
                </ELink>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6 col-mb-12">
            <div className="card">
              <div className="card-body">
                <ELink link="https://uclaacm.com/events">
                  <h3>Events &rarr;</h3>
                  <p>We love talking about open-source. Come talk with us!</p>
                </ELink>
              </div>
            </div>
          </div>
          <div className="col-6 col-mb-12">
            <div className="card">
              <div className="card-body">
                <Link href="/contribute">
                  <h3>Contribute &rarr;</h3>
                  <p>Make your first pull request with us!</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <h2>featured project</h2>
        <ProjectCard
          project={randomProject ? randomProject : projects[projNumToDisplay]}
          preload={true}
          githubColors={githubColors}
        />
        <h2>what we&apos;ve been doing recently...</h2>
        <p>this is a live feed of our {numRepos} repositories</p>
        <div className="card">
          <div className="card-body">
            {recentEvents
              // Filter to remove bot accounts (dependabot, etc)
              .filter(
                (event: GitHubEvent) =>
                  !['[bot]'].some((botAccount) =>
                    event.actor.login.includes(botAccount),
                  ),
              )
              .map((event: GitHubEvent) => (
                <GitHubEventComponent {...event} key={event.id} />
              ))}
            <p>
              see more activity{' '}
              <ELink link="https://github.com/uclaacm/">on our org</ELink>!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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

  const githubColors = await getGithubColors();

  const projects = await getProjects();
  const projNumToDisplay = getRandomProj(projects);

  return {
    props: {
      numRepos,
      recentEvents,
      projects,
      githubColors,
      projNumToDisplay,
      randomProject: false,
    },
    revalidate: 60,
  };
};
