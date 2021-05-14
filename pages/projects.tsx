import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

import projects from '../data/projects';

function Projects(): JSX.Element {
  return (
    <Layout>
      <div className="container">
        <h1>
          projects
        </h1>
        <p>
          a heads-up overview of the projects that power ACM at UCLA.
        </p>
        <hr />
        <div className="row">
          {projects.map((project) => {
            return (
              <div className="col-4" key={project.name}>
                <ProjectCard project={project} vertical />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;
