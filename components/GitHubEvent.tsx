import React from 'react';
import ELink from './ELink';
import GitHubEventAction from './GitHubEventAction';

// TODO(mattxwang): get the official types from the type registry;
// see https://github.com/octokit/types.ts
// and https://docs.github.com/en/rest/reference/activity#list-public-events
// and https://docs.github.com/en/developers/webhooks-and-events/github-event-types
interface GitHubEvent {
  id: string
  type: string
  actor: GitHubActor
  repo: GitHubRepo
  created_at: string
  //NOTE: payload is any even in the octokit response
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  payload: any
  /* eslint-enable  @typescript-eslint/no-explicit-any */
}

interface GitHubActor {
  id: number
  login: string
  display_login?: string
  gravatar_id: string
  url: string
  avatar_url: string
}

interface GitHubRepo {
  id: number
  name: string
  url: string
}

function GitHubEvent(props: GitHubEvent): JSX.Element {
  const {type, actor, repo, payload} = props;
  const userLink = !actor.login.includes('[bot]') ? <ELink link={`https://github.com/${actor.login}`}>{`@${actor.login}`}</ELink> : actor.login;
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
