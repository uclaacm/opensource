import { Endpoints } from '@octokit/types';
import React from 'react';
import ELink from './ELink';
import GitHubEventAction from './GitHubEventAction';

type GitHubEvent =
  Endpoints['GET /orgs/{org}/events']['response']['data'][number];

function GitHubEvent(props: GitHubEvent): JSX.Element {
  const { type, actor, repo, payload } = props;
  const userLink = !actor.login.includes('[bot]') ? (
    <ELink
      link={`https://github.com/${actor.login}`}
    >{`@${actor.login}`}</ELink>
  ) : (
    `@${actor.login}`
  );
  return (
    <>
      {/* <div className="card" style={{marginTop: "20px"}}> */}
      {/* <div className="card-body"> */}
      {userLink} <GitHubEventAction type={type} payload={payload} />{' '}
      <ELink link={`https://github.com/${repo.name}`}>{repo.name}</ELink>
      <hr />
      {/*  </div> */}
      {/* // </div> */}
    </>
  );
}

export default GitHubEvent;
