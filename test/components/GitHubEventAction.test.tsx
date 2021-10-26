import React from 'react';
import GitHubEventAction from '../../components/GitHubEventAction';
import createEventBranchData from '../fixtures/CreateEvent-Branch.json';
import deleteEventBranchData from '../fixtures/DeleteEvent-Branch.json';
import forkEventData from '../fixtures/ForkEvent.json';
import issueCommentEventData from '../fixtures/IssueCommentEvent.json';
import issuesEventClosedData from '../fixtures/IssuesEvent-Closed.json';
import issuesEventOpenedData from '../fixtures/IssuesEvent-Opened.json';
import pullRequestEventClosedData from '../fixtures/PullRequestEvent-Closed.json';
import pullRequestEventOpenedData from '../fixtures/PullRequestEvent-Opened.json';
import pullRequestReviewCommentEventData from '../fixtures/PullRequestReviewCommentEvent.json';
import pullRequestReviewEventData from '../fixtures/PullRequestReviewEvent.json';
import pushEventMultipleCommitsData from '../fixtures/PushEvent-MultipleCommits.json';
import pushEventSingleCommitData from '../fixtures/PushEvent-SingleCommit.json';

import { render } from '../testUtils';


const testCases = [
  {
    data: createEventBranchData,
    expectedOutput: 'created branch town-hall-f21 in',
  },
  {
    data: deleteEventBranchData,
    expectedOutput: 'deleted branch jedis-typo in',
  },
  {
    data: forkEventData,
    expectedOutput: 'forked ansh-saini/website-1 from',
    expectedHref: 'https://github.com/ansh-saini/website-1',
  },
  {
    data: issueCommentEventData,
    expectedOutput: 'commented on issue #45 in',
    expectedHref: 'https://github.com/uclaacm/membership-portal/pull/45',
  },
  {
    data: issuesEventOpenedData,
    expectedOutput: 'opened issue #106 in',
    expectedHref: 'https://github.com/uclaacm/icpc-website/issues/106',
  },
  {
    data: issuesEventClosedData,
    expectedOutput: 'closed issue #321 in',
    expectedHref: 'https://github.com/uclaacm/website/issues/321',
  },
  {
    data: pullRequestEventOpenedData,
    expectedOutput: 'opened pull request #324 in',
    expectedHref: 'https://github.com/uclaacm/website/pull/324',
  },
  {
    data: pullRequestEventClosedData,
    expectedOutput: 'closed pull request #324 in',
    expectedHref: 'https://github.com/uclaacm/website/pull/324',
  },
  {
    data: pullRequestReviewEventData,
    expectedOutput: 'reviewed pull request #262 in',
    expectedHref: 'https://github.com/uclaacm/hack.uclaacm.com/pull/262',
  },
  {
    data: pullRequestReviewCommentEventData,
    expectedOutput: 'commented on pull request #262 in',
    expectedHref: 'https://github.com/uclaacm/hack.uclaacm.com/pull/262#discussion_r734235143',
  },
  {
    data: pushEventSingleCommitData,
    expectedOutput: 'pushed 1 commit to',
  },
  {
    data: pushEventMultipleCommitsData,
    expectedOutput: 'pushed 2 commits to',
  },
];

describe('GitHub Event Action', () => {
  testCases.forEach(({data ,expectedOutput, expectedHref}) => {
    it(`renders correct string for ${data.type}`, () => {
      const {container} = render(<GitHubEventAction payload={data.payload} type={data.type} />, {});

      const element = container.querySelector('span');
      expect(element.textContent).toBe(expectedOutput);

      if (expectedHref) {
        expect(element.querySelector('a').href).toBe(expectedHref);
      }
    });
  });
});
