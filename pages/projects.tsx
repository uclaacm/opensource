import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { getProjects, Project, GitHubColors, getGithubColors } from '../util';


interface ProjectsProps {
  projects: Project[];
  githubColors: GitHubColors
}

function Projects({ projects, githubColors }: ProjectsProps): JSX.Element {
  return (
    <Layout>
      <div className="container">
        <h1>
          projects
        </h1>
        <p>
          a (work-in-progress) heads-up overview of the projects that power ACM at UCLA.
        </p>
        <hr />
        <div className="row same-height-grid">
          {projects.map((project, i) => {
            return (
              <div className="col-4" key={project.name}>
                <ProjectCard project={project} vertical preload={i < 3} githubColors={githubColors} />
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
  const projects = await getProjects();
  const githubColors = await getGithubColors();
  return {
    props: {
      projects,
      githubColors: githubColors,
    },
    revalidate: 60,
  };
};
