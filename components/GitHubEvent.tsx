import moment from 'moment';
import React from 'react';
import ELink from './ELink';
import GitHubEventAction from './GitHubEventAction';
import { GitHubEvent } from '../util';


function GitHubEventComponent(props: GitHubEvent): JSX.Element {
  const { type, actor, repo, payload, created_at } = props;
  const timePassed = moment(created_at).fromNow();
  const userLink = !actor.login.includes('[bot]') ? <ELink link={`https://github.com/${actor.login}`}>{`@${actor.login}`}</ELink> : actor.login;
  return (
    <>
      {/* <div className="card" style={{marginTop: "20px"}}> */}
      {/* <div className="card-body"> */}
      <div style={{ overflow: 'hidden' }}>
        {userLink} <GitHubEventAction type={type} payload={payload} />{' '}
        <ELink link={`https://github.com/${repo.name}`}>{repo.name}</ELink>
        <span style={{ float: 'right' }}>{timePassed}</span>
      </div>
      <hr />
      {/*  </div> */}
      {/* // </div> */}
    </>
  );
}

export default GitHubEventComponent;
