import React from 'react';
import { Project, GitHubColors } from '../util';
import ELink from './ELink';

interface ContributeProjectProps {
  project: Project,
  githubColors: GitHubColors
}

export default function ContributeProject({
  project,
  githubColors,
}: ContributeProjectProps): JSX.Element {
  const {
    name,
    description,
    repo,
    lang,
    topics,
  } = project;

  return (
    <>
      <div className="spaced-row">
        <h3><ELink link={repo + '/issues'}>{name}</ELink></h3>
        <p>
          <span
            className="dev-language-badge"
            style={{
              backgroundColor: githubColors[lang]
                ? githubColors[lang].color
                : 'black',
            }}
          ></span>{' '}
          {lang || 'Markdown'}
        </p>
      </div>
      <div>{topics.length > 0 && <span> • {topics.join(', ')}</span>}</div>
      <div>{description}</div>
      <hr />
    </>
  );
}