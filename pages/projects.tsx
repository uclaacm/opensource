import { NextSeo } from 'next-seo';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

import projects from '../data/projects';

function Projects(): JSX.Element {
  return (
    <Layout>
      <div className="container">
        <NextSeo
          title="projects | open source at ACM at UCLA"
          description="a heads-up overview of the projects that power ACM at UCLA"
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
