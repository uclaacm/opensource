import React from 'react';
import ELink from './ELink';
// TODO(mattxwang): fix the payload thing to actually use a type, maybe
// from the octokit types
interface GitHubEventActionProps {
  type: string,
  payload: any,
}

// TODO(mattxwang): this doesn't seem like the best way to do this ://
// returns a string of form: <verb> <location/type of action> <preposition>
function GitHubEventAction({type, payload}: GitHubEventActionProps): JSX.Element {
  const unknown = <span>did a {type} on</span>;
  switch(type){
    case 'CreateEvent':
    case 'DeleteEvent': {
      const target = payload?.ref;
      const targetType = payload?.ref_type;
      if (!target || !targetType) {
        return unknown;
      }
      const action = type === 'CreateEvent'? 'created' : 'deleted';
      return <span>{action} {targetType} <code>{target}</code> in</span>;
    }
    case 'ForkEvent': {
      const forkee = payload?.forkee;
      const full_name = forkee?.full_name;
      const html_url = forkee?.html_url;
      if (!forkee || !full_name || !html_url) {
        return unknown;
      }
      return <span>forked <ELink link={html_url}>{full_name}</ELink> from</span>;
    }
    case 'IssueCommentEvent': {
      const action = payload?.action;
      const issue = payload?.issue;
      const issueURL = issue?.html_url;
      const issueNum = issue?.number;
      if (!action || !issue || !issueURL) {
        return unknown;
      }
      const issueText = issueNum ? `issue #${issueNum}` : 'an issue';
      const actionStr = action === 'created' ? 'commented on' : action;
      return <span>{actionStr} <ELink link={issueURL}>{issueText}</ELink> in</span>;
    }
    case 'IssuesEvent': {
      const action = payload?.action;
      const issue = payload?.issue;
      const issueURL = issue?.html_url;
      const issueNum = issue?.number;
      if (!action || !issue || !issueURL) {
        return unknown;
      }
      const issueText = issueNum ? `issue #${issueNum}` : 'an issue';
      return <span>{action} <ELink link={issueURL}>{issueText}</ELink> in</span>;
    }
    case 'PullRequestEvent': {
      const action = payload?.action;
      const prNum = payload?.number;
      const prURL = payload?.pull_request?.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      return <span>{action} <ELink link={prURL}>pull request #{prNum}</ELink> in</span>;
    }
    case 'PullRequestReviewEvent': {
      const action = payload?.action;
      const prNum = payload?.pull_request?.number;
      const prURL = payload?.pull_request?.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      const actionStr = action === 'created' ? 'reviewed' : action;
      return <span>{actionStr} <ELink link={prURL}>pull request #{prNum}</ELink> in</span>;
    }
    case 'PushEvent': {
      const size = payload?.size; // should this be distinct_size?
      const sizeStr = size ? size : '1'; // should we use 'a'?
      return <span>pushed {sizeStr} commit{size !== 1 && 's'} to</span>;
    }
    case 'PublicEvent': {
      return <span>made a new repository public:</span>;
    }
    default:
      return unknown;
  }
}

export default GitHubEventAction;
