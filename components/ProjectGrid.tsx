import React from 'react';
import ProjectCard from '../components/ProjectCard';
import {Project, GitHubColors} from '../util';

export interface ProjectsProps {
  projects: Project[];
  githubColors: GitHubColors
}

function ProjectGrid({projects, githubColors}: ProjectsProps): JSX.Element {
  return (
    <div className="row same-height-grid">
      {projects.length > 0
        ? projects.map((project, i) => {
          return (
            <div className="col-4" key={project.name}>
              <ProjectCard project={project} vertical preload={i < 3} githubColors={githubColors} />
            </div>
          );
        })
        : <h2>No results found</h2>
      }
    </div>
  );
}

export default ProjectGrid;