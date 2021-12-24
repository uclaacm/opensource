import Image from 'next/image';
import React from 'react';

import { Project } from '../util/';
import ELink from './ELink';

interface ProjectCardProps {
  project: Project;
  vertical?: boolean;
  preload?: boolean;
}

interface ProjectCardImageProps {
  project: Project;
  preload: boolean;
}

function ProjectCardImage({ project, preload }: ProjectCardImageProps) {
  const { image, alt, link } = project;
  return (
    <ELink link={link}>
      <Image
        src={image}
        alt={alt}
        width="1000"
        height="800"
        layout="responsive"
        priority={preload}
      />
    </ELink>
  );
}

function ProjectCardBody({
  name,
  description,
  repo,
  link,
  lang,
  topics,
}: Project) {
  return (
    <div className="card-body">
      <h3 className="mt-1">
        <ELink link={link}>{name}</ELink>
      </h3>
      <p>
        <span className={`dev-language-badge lang-${lang}`}></span> {lang}
        {topics && <span> • {topics.join(', ')}</span>}
      </p>
      <p>{description}</p>
      <ELink link={repo}>GitHub Repository</ELink>
    </div>
  );
}

// TODO(mattxwang): consider revisiting how this component works
// TODO(mattxwang): Mobile responsiveness (waiting on WestwoodCSS)
function ProjectCard({
  project,
  vertical = false,
  preload = false,
}: ProjectCardProps): JSX.Element {
  if (vertical) {
    return (
      <div className="card">
        <ProjectCardImage project={project} preload={preload} />
        <ProjectCardBody {...project} />
      </div>
    );
  }
  return (
    <div className="card">
      <div className="row">
        <div className="col-6">
          <ProjectCardImage project={project} preload={preload} />
        </div>
        <div className="col-6">
          <ProjectCardBody {...project} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
