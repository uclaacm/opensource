import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { getProjects, Project } from '../util';

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps): JSX.Element {
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
  const projects = await getProjects();

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};
