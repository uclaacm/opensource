import { Octokit } from '@octokit/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
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
          description="at the largest computer science community at UCLA, we care about open source and software freedom."
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
          open source at{' '}
          <ELink link="https://uclaacm.com">
            ACM at UCLA
          </ELink>
        </h1>
        <hr />
        <p className="knockout-description">
          at the largest computer science community at UCLA,
          <br /> <b>we care about open source.</b>
        </p>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <Link href="/projects">
                  <a>
                    <h3>Projects &rarr;</h3>
                    <p>
                      All of our projects are open source! Literally, all of
                      them.
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <ELink link="https://dev-pathways.netlify.app/">
                  <h3>Learning &rarr;</h3>
                  <p>Pick up the skills to write great software.</p>
                </ELink>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <ELink link="https://uclaacm.com/events">
                  <h3>Events &rarr;</h3>
                  <p>We love talking about open source. Come talk with us!</p>
                </ELink>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <Link href="/contribute">
                  <a>
                    <h3>Contribute &rarr;</h3>
                    <p>No coding experience needed! There are many ways to contribute.</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-2" />

        <h2>featured projects</h2>
        <ProjectCard
          project={randomProject ? randomProject : projects[projNumToDisplay]} preload={true}
          githubColors={githubColors}
        />
        <h3>Open Access &amp; Data</h3>
          <ol>
          <li><a href='https://www.library.ucla.edu/openucla'>OpenUCLA</a></li>
          <li><a href='https://www.uclaextension.edu/uclaxopen'>UCLAxOpen</a></li>
          <li><a href='https://wiki.openstreetmap.org/wiki/BruinMappers'>BruinMappers</a>: student-run mapping club for UCLA campus and its surrounding area.</li>

          </ol>
        <h3>Research and development</h3>
          <ol>
          <li><a href='https://github.com/eggert/tz'>tz</a>: time zone database. Maintained by Paul Eggert.</li>
          <li><a href='https://github.com/daharoni?tab=repositories'>Miniscope project</a>: microscope technology for studying neuroscience lead by  Daniel Ahuaroni.</li>
          <li><a href='https://github.com/DerrickXuNu/OpenCOOD'>OpenCOOD</a>: open source framework for autonomous driving.</li>
          <li><a href='https://zarlab.cs.ucla.edu/software/'>ZarLab</a>: a collection of biotechnology tools for analyzing genes and molecular data.</li>

          </ol>
        <h2>what we&apos;ve been doing recently...</h2>
        <p>this is a live feed of our {numRepos} repositories</p>
        <div className="card">
          <div className="card-body">
            {recentEvents.map((event: GitHubEvent) => (
              <GitHubEventComponent {...event} key={event.id} />
            ))}
            <p>
              see more activity{' '}
              <ELink link="https://github.com/uclaacm/">
                on our org
              </ELink>
              !
            </p>
          </div>
        </div>
      </div >
    </Layout >
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
