import Image from 'next/legacy/image';
import React from 'react';
import ELink from './ELink';
import { Project, GitHubColors } from '../util/';

interface ProjectCardProps {
  project: Project;
  vertical?: boolean;
  preload?: boolean;
  githubColors: GitHubColors;
  searchQuery?: string;
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
        height="1000"
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
        height="1000"
        layout="responsive"
        priority={preload}
      />
    </>
  );
}

interface ProjectCardBodyProps {
  githubColors: GitHubColors;
  project: Project;
  searchQuery?: string;
}

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    ),
  );
};

function ProjectCardBody({
  project,
  searchQuery = '',
  ...props
}: ProjectCardBodyProps) {
  const { repo, link, lang } = project;

  const name = highlightText(project.name, searchQuery);
  const description = highlightText(project.description, searchQuery);

  const topics = (() => {
    if (project.topics.length === 0) return [];
    return project.topics.map((topic, index) => (
      <span key={index}>
        {highlightText(topic, searchQuery)}
        {index < project.topics.length - 1 && ', '}
      </span>
    ));
  })();

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
        {topics.length > 0 && <span> • {topics}</span>}
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
  searchQuery = '',
}: ProjectCardProps): JSX.Element {
  if (vertical) {
    return (
      <div className="card">
        <ProjectCardImage project={project} preload={preload} />
        <ProjectCardBody
          searchQuery={searchQuery}
          project={project}
          githubColors={githubColors}
        />
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
          <ProjectCardBody
            searchQuery={searchQuery}
            project={project}
            githubColors={githubColors}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
