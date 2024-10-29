import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import SearchFilter from '../components/SearchFilter/SearchFilter';
import { getGithubColors, getProjects, GitHubColors, Project } from '../util';

interface ProjectsProps {
  projects: Project[];
  githubColors: GitHubColors;
}

function Projects({ projects, githubColors }: ProjectsProps): JSX.Element {
  // projects is a master list of all the projects that we fetched, filteredProjects is the one that we render
  // to the user
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <Layout>
      <div className="container">
        <NextSeo
          title="projects | open source at ACM at UCLA"
          description="a heads-up overview of the projects that power ACM at UCLA"
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
        <h1>projects</h1>
        <p>
          an overview of all open-source projects affiliated with UCLA,
          extending beyond those managed by ACM at UCLA.
        </p>
        <hr />
        <SearchFilter
          projects={projects}
          setFilteredProjects={setFilteredProjects}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <hr />
        <div className="row same-height-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => {
              return (
                <div className="col-4" key={project.name}>
                  <ProjectCard
                    searchQuery={searchQuery}
                    project={project}
                    vertical
                    preload={i < 3}
                    githubColors={githubColors}
                  />
                </div>
              );
            })
          ) : (
            <h2>No results found</h2>
          )}
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
