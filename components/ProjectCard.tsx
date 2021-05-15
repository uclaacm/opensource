import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Project } from '../util/';

interface ProjectCardProps {
  project: Project
  vertical?: boolean
  preload?: boolean
}

interface ProjectCardImageProps {
  project: Project
  preload: boolean
}

const linkProps = {
  rel: 'noopener noreferrer',
  target: '_blank',
};

function ProjectCardImage({project, preload}: ProjectCardImageProps) {
  const { image, alt, link } = project;
  return (
    <Link href={link}>
      <a {...linkProps}>
        <Image
          src={image}
          alt={alt}
          width="1000"
          height="800"
          layout="responsive"
          priority={preload}
        />
      </a>
    </Link>
  );
}

function ProjectCardBody({ name, description, repo, link, lang, tech }: Project) {
  return (
    <div className="card-body">
      <h3 className="mt-1">
        <Link href={link} >
          <a {...linkProps}>
            {name}
          </a>
        </Link>
      </h3>
      <p>
        <span className={`dev-language-badge lang-${lang}`}></span> {lang}
        {tech && <span> • {tech.join(', ')}</span>}
      </p>
      <p>{description}</p>
      <Link href={repo}>
        <a {...linkProps}>GitHub Repository</a>
      </Link>
    </div>
  );
}

// TODO(mattxwang): consider revisiting how this component works
// TODO(mattxwang): Mobile responsiveness (waiting on WestwoodCSS)
function ProjectCard({project, vertical = false, preload = false}: ProjectCardProps): JSX.Element {
  if (vertical) {
    return (
      <div className="card">
        <ProjectCardImage project={project} preload={preload}/>
        <ProjectCardBody {...project}/>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="row">
        <div className="col-6">
          <ProjectCardImage project={project} preload={preload}/>
        </div>
        <div className="col-6">
          <ProjectCardBody {...project}/>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
