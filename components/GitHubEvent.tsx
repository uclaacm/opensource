import React from 'react';
import ELink from './ELink';
import GitHubEventAction, { GitHubEventPayloadType } from './GitHubEventAction';

// TODO(#74): Remove disclaimer when types are accurate
// DISCLAIMER: Some types for GitHubEvent may not be exactly accurate.
// Take a look at https://docs.github.com/en/developers/webhooks-and-events/events/github-event-types
// for more accurate typing.
interface GitHubEvent {
  id: string
  type: string
  actor: GitHubActor
  repo: GitHubRepo
  created_at: string
  payload: GitHubEventPayloadType
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
