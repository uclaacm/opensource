import Link from 'next/link';
import React from 'react';

// TODO(mattxwang): get the official types from the type registry;
// see https://github.com/octokit/types.ts
// and https://docs.github.com/en/rest/reference/activity#list-public-events
// and https://docs.github.com/en/developers/webhooks-and-events/github-event-types
interface GitHubEvent {
  type: string,
  actor: GitHubActor,
  repo: GitHubRepo,
}

interface GitHubActor {
  id: number,
  login: string,
  display_login?: string,
  gravatar_id: string,
  url: string,
  avatar_url: string,
}

interface GitHubRepo {
  id: number,
  name: string,
  url: string,
}

function GitHubEvent(props: GitHubEvent): JSX.Element {
  const {type, actor, repo} = props;
  return (
    <div className="card" style={{marginTop: "20px"}}>
      <div className="card-body">
        <b>{actor.login}</b> did a {type} on <Link href={`https://github.com/${repo.name}`}>{repo.name}</Link>
      </div>
    </div>
  )
}

export default GitHubEvent;
