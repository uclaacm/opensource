import Image from 'next/image';
import React from 'react';
import { GFIProject, GitHubColors, GithubIssueAssignees } from '../util';
import ELink from './ELink';


interface ContributeProjectProps {
  project: GFIProject,
  githubColors: GitHubColors
}

export default function ContributeProject({
  project,
  githubColors,
}: ContributeProjectProps): JSX.Element {
  const {issues} = project;
  const proppedProject = project.project;
  const {
    name,
    description,
    repo,
    lang,
    topics,
  } = proppedProject;
  const displayedIssues = issues.map(issue=> (
    <div style={{display: 'flex'}} key={issue.url}>
      <p>#{issue.number}</p>
      <p><ELink link={issue.url}>{issue.title}</ELink></p>
      <AssignedIssueUsers assignees={issue.assignees ?? []}/>
      <div>
        <Image src={'/comment.svg'} height="15" width="15"/>
        <span>{issue.comments}</span>
      </div>
    </div>
  ));
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
      <h3>Issues</h3>
      {displayedIssues}
      <hr />
    </>
  );
}

interface AssignedIssueUsersProps {
  assignees: GithubIssueAssignees
}
function AssignedIssueUsers(props: AssignedIssueUsersProps ){
  const displayedAssignees = props.assignees.map(assignee =>
    assignee ?
      (<div key={assignee.login}>
        <ELink link={assignee.html_url}>
          <div className='assignee-image'>
            <Image
              src={assignee.avatar_url}
              alt={`${assignee.login}'s profile picture`}
              width="30"
              height="30"
              layout="responsive"
            />
          </div>
        </ELink>
      </div>
      )
      : <></>,
  );
  return(
    <div  style={{display: 'flex'}}>
      {displayedAssignees}
    </div>
  );
}