import { Octokit } from '@octokit/core';
import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../util';

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps): JSX.Element {
  return (
    <Layout>
      <div className="container">
        <h1>projects</h1>
        <p>
          a (work-in-progress) heads-up overview of the projects that power ACM
          at UCLA.
        </p>
        <hr />
        <div className="row">
          {projects.map((project, i) => {
            return (
              <div className="col-4" key={project.name}>
                <ProjectCard project={project} vertical preload={i < 3} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const octokit = new Octokit();
  const projectsResponse = await octokit.request('GET /orgs/{org}/repos', {
    org: 'uclaacm',
    per_page: 100,
  });

  const sortedData = projectsResponse.data.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  const projects = sortedData.map(
    (repo) =>
      ({
        name: repo.name,
        description: repo.description,
        link: repo.homepage || null,
        repo: repo.html_url,
        lang: repo.language,
        topics: repo.topics,
        image: repo.owner.avatar_url,
        alt: repo.owner.name || null,
        updated_at: repo.updated_at,
      } as Project),
  );

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};
