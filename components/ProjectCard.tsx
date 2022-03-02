import Image from 'next/image';
import React from 'react';
import { Project, GitHubColors } from '../util/';
import ELink from './ELink';

interface ProjectCardProps {
  project: Project;
  vertical?: boolean;
  preload?: boolean;
  githubColors: GitHubColors
}

interface ProjectCardImageProps {
  project: Project;
  preload: boolean;
}

function ProjectCardImage({ project, preload }: ProjectCardImageProps) {
  const { image, alt, link } = project;
  return link ? (
    <ELink link={link}>
      <Image
        src={image ?? '/logo.png'}
        alt={alt}
        width="1000"
        height="800"
        layout="responsive"
        priority={preload}
      />
    </ELink>
  ) : (
    <>
      <Image
        src={image}
        alt={alt}
        width="1000"
        height="800"
        layout="responsive"
        priority={preload}
      />
    </>
  );
}

interface ProjectCardBodyProps {
  githubColors: GitHubColors,
  project: Project
}

function ProjectCardBody(props: ProjectCardBodyProps) {
  const {
    name,
    description,
    repo,
    link,
    lang,
    topics,
  } = props.project;
  return (
    <div className="card-body">
      <h3 className="mt-1">
        {link ? <ELink link={link}>{name}</ELink> : name}
      </h3>
      <p>
        <span
          className="dev-language-badge"
          style={{
            backgroundColor: props.githubColors[lang]
              ? props.githubColors[lang].color
              : 'black',
          }}
        ></span>{' '}
        {lang || 'Markdown'}
        {topics.length > 0 && <span> • {topics.join(', ')}</span>}
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
  githubColors,
}: ProjectCardProps): JSX.Element {
  if (vertical) {
    return (
      <div className="card">
        <ProjectCardImage project={project} preload={preload} />
        <ProjectCardBody project={project} githubColors={githubColors} />
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
          <ProjectCardBody project={project} githubColors={githubColors} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
