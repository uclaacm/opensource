import React from 'react';
import GitHubEventAction from '../../components/GitHubEventAction';
import createEventData from '../fixtures/createEvent.json';
import deleteEventData from '../fixtures/deleteEvent.json';
import forkEventData from '../fixtures/forkEvent.json';
import issueCommentEventData from '../fixtures/issueCommentEvent.json';
import issuesEventData from '../fixtures/issuesEvent.json';
import pullRequestEventData from '../fixtures/pullRequestEvent.json';
import pullRequestReviewCommentEventData from '../fixtures/pullRequestReviewCommentEvent.json';
import pullRequestReviewEventData from '../fixtures/pullRequestReviewEvent.json';
import pushEventData from '../fixtures/pushEvent.json';

import { render } from '../testUtils';


const testCases = [
  {
    data: createEventData,
    expectedOutput: 'created branch town-hall-f21 in',
  },
  {
    data: deleteEventData,
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
    data: issuesEventData,
    expectedOutput: 'opened issue #106 in',
    expectedHref: 'https://github.com/uclaacm/icpc-website/issues/106',
  },
  {
    data: pullRequestEventData,
    expectedOutput: 'opened pull request #324 in',
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
    data: pushEventData,
    expectedOutput: 'pushed 1 commit to',
  },
];

describe('GitHub Event Action', () => {
  testCases.forEach(({data ,expectedOutput, expectedHref}) => {
    it(`renders correct string for ${data.type}}`, () => {
      const {container} = render(<GitHubEventAction payload={data.payload} type={data.type} />, {});

      const element = container.querySelector('span');
      expect(element.textContent).toBe(expectedOutput);

      if (expectedHref) {
        expect(element.querySelector('a').href).toBe(expectedHref);
      }
    });
  });
});
