import { CreateEvent, DeleteEvent, ForkEvent, IssueCommentEvent, IssuesEvent, MemberEvent,
  PullRequestEvent, PullRequestReviewCommentEvent, PullRequestReviewEvent,
  PushEvent, PublicEvent, WatchEvent } from '@octokit/webhooks-types';
import React from 'react';
import ELink from './ELink';

type payloadType =
| CreateEvent
| DeleteEvent
| ForkEvent
| IssueCommentEvent
| IssuesEvent
| MemberEvent
| PullRequestEvent
| PullRequestReviewCommentEvent
| PullRequestReviewEvent
| PushEvent
| PublicEvent
| WatchEvent;

interface GitHubEventActionProps {
  type: string,
  payload: payloadType,
}

// TODO(mattxwang): this doesn't seem like the best way to do this ://
// returns a string of form: <verb> <location/type of action> <preposition>
function GitHubEventAction({type, payload}: GitHubEventActionProps): JSX.Element {
  const unknown = <span>did a {type} on</span>;
  switch(type){
    case 'CreateEvent':
    case 'DeleteEvent': {
      const payloadNarrowed = payload as DeleteEvent;
      const target = (payloadNarrowed).ref;
      const targetType = (payloadNarrowed).ref_type;
      const action = type === 'CreateEvent'? 'created' : 'deleted';
      if (!target) {
        return <span>{action} the {targetType} </span>;
      }
      if (!targetType) {
        return unknown;
      }
      return <span>{action} {targetType} <code>{target}</code> in</span>;
    }
    case 'ForkEvent': {
      const payloadNarrowed = payload as ForkEvent;
      const forkee = (payloadNarrowed).forkee;
      const full_name = forkee.full_name;
      const html_url = forkee.html_url;
      if (!forkee || !full_name || !html_url) {
        return unknown;
      }
      return <span>forked <ELink link={html_url}>{full_name}</ELink> from</span>;
    }
    case 'IssueCommentEvent': {
      const payloadNarrowed = payload as IssueCommentEvent;
      const action = (payloadNarrowed).action;
      const issue = (payloadNarrowed).issue;
      const issueURL = issue.html_url;
      const issueNum = issue.number;
      if (!action || !issue || !issueURL) {
        return unknown;
      }
      const issueText = issueNum ? `issue #${issueNum}` : 'an issue';
      const actionStr = action === 'created' ? 'commented on' : action;
      return <span>{actionStr} <ELink link={issueURL}>{issueText}</ELink> in</span>;
    }
    case 'IssuesEvent': {
      const payloadNarrowed = payload as IssuesEvent;
      const action = (payloadNarrowed).action;
      const issue = (payloadNarrowed).issue;
      const issueURL = issue.html_url;
      const issueNum = issue.number;
      if (!action || !issue || !issueURL) {
        return unknown;
      }
      const issueText = issueNum ? `issue #${issueNum}` : 'an issue';
      return <span>{action} <ELink link={issueURL}>{issueText}</ELink> in</span>;
    }
    case 'MemberEvent': {
      const payloadNarrowed = payload as MemberEvent;
      const action = (payloadNarrowed).action;
      const targetName = (payloadNarrowed).member.login;
      const targetUrl = (payloadNarrowed).member.html_url;
      const editedMessage = action === 'edited' ? ' permissions for ' : '';
      return <span>{action}{editedMessage}<ELink link={targetUrl}>@{targetName}</ELink> as a collaborator on</span>;
    }
    case 'PullRequestEvent': {
      const payloadNarrowed = payload as PullRequestEvent;
      const action = (payloadNarrowed).action;
      const prNum = (payloadNarrowed).number;
      const prURL = (payloadNarrowed).pull_request.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      return <span>{action} <ELink link={prURL}>pull request #{prNum}</ELink> in</span>;
    }
    case 'PullRequestReviewCommentEvent': {
      const payloadNarrowed = payload as PullRequestReviewCommentEvent;
      const action = (payloadNarrowed).action;
      const actionStr = action === 'created' ? 'commented' : action;
      const prNum = (payloadNarrowed).pull_request.number;
      const prURL = (payloadNarrowed).comment.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      return (
        <span>{actionStr} on<ELink link={prURL}> pull request #{prNum}</ELink> in</span>
      );
    }
    case 'PullRequestReviewEvent': {
      const payloadNarrowed = payload as PullRequestReviewEvent;
      const action = (payloadNarrowed).action;
      const prNum = (payloadNarrowed).pull_request.number;
      const prURL = (payloadNarrowed).pull_request.html_url;
      if (!action || !prNum || !prURL) {
        return unknown;
      }
      const actionStr = action === 'submitted' ? 'reviewed' : action;
      return <span>{actionStr} <ELink link={prURL}>pull request #{prNum}</ELink> in</span>;
    }
    case 'PushEvent': {
      const payloadNarrowed = payload as PushEvent;
      const size = payloadNarrowed.commits.length;
      const sizeStr = size ? size : '1';
      return <span>pushed {sizeStr} commit{size !== 1 && 's'} to</span>;
    }
    case 'PublicEvent': {
      return <span>made a new repository public:</span>;
    }
    case 'WatchEvent': {
      return <span>watched</span>;
    }
    default:
      return unknown;
  }
}

export default GitHubEventAction;
