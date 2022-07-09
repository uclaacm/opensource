import Image from 'next/image';
import React, { useState } from 'react';
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
    image,
    alt,
  } = proppedProject;

  const numIssues = issues.length;

  const [displayGfis, setDisplayGfis] = useState(false);

  const displayedIssues = (
    <table>
      <tbody>
        {
          issues.map(issue=> (
            <tr key={issue.url} >
              <td>#{issue.number}</td>
              <td><ELink link={issue.html_url}>{issue.title}</ELink></td>
              <td><AssignedIssueUsers assignees={issue.assignees ?? []}/></td>
              <td>
                <span className='vertically-aligned-row'>
                  <span className='comment-icon'><Image src={'/comment.svg'} height="15" width="15"/></span>
                  {issue.comments}
                </span>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
  return (
    <>
      <div className="spaced-row">
        <div className='gfi-title'>
          <div className='gfi-image'>
            <Image
              src={ image ?? '/logo.png'}
              alt={alt}
              width="75"
              height="75"
              layout="responsive"
            />
          </div>
          <h3><ELink link={repo + '/issues'}>{name}</ELink></h3>
        </div>

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
      {topics.length > 0 &&
      <span>
        <dl>
          <dt>Topics • </dt>
          <dd>  {topics.join(', ')}</dd>
        </dl>
      </span>
      }
      <div>{description}</div>
      <div className='spaced-row vertically-aligned-row'>
        <h4>good first issues</h4>
        <button
          type='button'
          onClick={() => setDisplayGfis(prevVal => !prevVal)}
          className={displayGfis ? 'gfi-button-displayed' : 'gfi-button'}
        >
          {numIssues} {numIssues > 1 ? ' issues' : ' issue'}
        </button>
      </div>
      { displayGfis && displayedIssues}
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
              title={assignee.login}
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
