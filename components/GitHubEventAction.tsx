import React from 'react';
// TODO(mattxwang): fix the payload thing to actually use a type, maybe
// from the octokit types
interface GitHubEventActionProps {
  type: string,
  payload: any,
}

// TODO(mattxwang): this doesn't seem like the best way to do this ://
// returns a string of form: <verb> <location/type of action> <preposition>
function GitHubEventAction({type, payload}: GitHubEventActionProps): JSX.Element {
  const linkProps = {
    rel: 'noopener noreferrer',
    target: '_blank',
  };
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
      return <span>{actionStr} <a href={issueURL} {...linkProps}>{issueText}</a> in</span>;
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
      return <span>{action} <a href={issueURL} {...linkProps}>{issueText}</a> in</span>;
    }
    case 'PullRequestEvent': {
      const action = payload?.action;
      const prNum = payload?.number;
      const prURL = payload?.pull_request?.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      return <span>{action} <a href={prURL} {...linkProps}>pull request #{prNum}</a> in</span>;
    }
    case 'PullRequestReviewEvent': {
      const action = payload?.action;
      const prNum = payload?.pull_request?.number;
      const prURL = payload?.pull_request?.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      const actionStr = action === 'created' ? 'reviewed' : action;
      return <span>{actionStr} <a href={prURL} {...linkProps}>pull request #{prNum}</a> in</span>;
    }
    case 'PushEvent': {
      const size = payload?.size; // should this be distinct_size?
      const sizeStr = size ? size : '1'; // should we use 'a'?
      return <span>pushed {sizeStr} commit{size !== 1 && 's'} to</span>;
    }
    default:
      return unknown;
  }
}

export default GitHubEventAction;
