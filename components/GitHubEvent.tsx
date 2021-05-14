import Link from 'next/link'
import React from 'react'

import GitHubEventAction from './GitHubEventAction'

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
  payload: any
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
  const userLink = !actor.login.includes('[bot]') ? <Link href={`https://github.com/${actor.login}`}>{`@${actor.login}`}</Link> : actor.login;
  return (
    <>
      {/* <div className="card" style={{marginTop: "20px"}}> */}
      {/* <div className="card-body"> */}
      {userLink} <GitHubEventAction type={type} payload={payload} />{' '}
      <Link href={`https://github.com/${repo.name}`}>{repo.name}</Link>
      <hr />
      {/*  </div> */}
      {/* // </div> */}
    </>
  );
}

export default GitHubEvent
