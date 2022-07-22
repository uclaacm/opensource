import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ProjectGrid, {ProjectsProps} from '../components/ProjectGrid';
import SearchFilter from '../components/SearchFilter/SearchFilter';
import { getProjects, getGithubColors } from '../util';

function Projects({ projects, githubColors }: ProjectsProps): JSX.Element {

  // projects is a master list of all the projects that we fetched, filteredProjects is the one that we render
  // to the user
  const [filteredProjects, setFilteredProjects] = useState(projects);

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
        <SearchFilter
          projects={projects}
          setFilteredProjects={setFilteredProjects}
        />
        <hr/>
        <ProjectGrid projects={filteredProjects} githubColors = {githubColors}/>
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
