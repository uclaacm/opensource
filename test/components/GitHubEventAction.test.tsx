import React from 'react';
import GitHubEventAction from '../../components/GitHubEventAction';
import { render } from '../testUtils';

const testCases = [
  {
    data: {
      type: 'CreateEvent',
      payload: {
        ref: 'dependabot/npm_and_yarn/eslint-plugin-import-2.25.2',
        ref_type: 'branch',
      },
    },
    expectedOutput: 'created branch dependabot/npm_and_yarn/eslint-plugin-import-2.25.2 in',
  },
  {
    data: {
      type: 'DeleteEvent',
      payload: {
        ref: 'dependabot/npm_and_yarn/eslint-plugin-import-2.25.2',
        ref_type: 'branch',
      },
    },
    expectedOutput: 'deleted branch dependabot/npm_and_yarn/eslint-plugin-import-2.25.2 in',
  },
  {
    data: {
      type: 'ForkEvent',
      payload: {
        forkee: {
          full_name: 'ansh-saini/opensource',
          html_url: 'https://github.com/ansh-saini/opensource',
        },
      },
    },
    expectedOutput: 'forked ansh-saini/opensource from',
  },
  {
    data: {
      type: 'IssueCommentEvent',
      payload: {
        action: 'created',
        issue: {
          html_url: 'https://github.com/uclaacm/opensource/issues/14',
          number: 14,
        },
      },
    },
    expectedOutput: 'commented on issue #14 in',
    testContext: 'create',
  },
  {
    data: {
      type: 'IssueCommentEvent',
      payload: {
        action: 'closed',
        issue: {
          html_url: 'https://github.com/uclaacm/opensource/issues/14',
          number: 14,
        },
      },
    },
    expectedOutput: 'closed issue #14 in',
    testContext: 'close',
  },
  {
    data: {
      type: 'IssueCommentEvent',
      payload: {
        action: 'closed',
        issue: {
          html_url: 'https://github.com/uclaacm/opensource/issues/14',
        },
      },
    },
    expectedOutput: 'closed an issue in',
    testContext: 'without issue number',
  },
  {
    data: {
      type: 'IssuesEvent',
      payload: {
        action: 'closed',
        issue: {
          html_url: 'https://github.com/uclaacm/opensource/issues/14',
          number: 14,
        },
      },
    },
    expectedOutput: 'closed issue #14 in',
  },
  {
    data: {
      type: 'PullRequestEvent',
      payload: {
        action: 'opened',
        number: 644,
        pull_request: {
          html_url: 'https://github.com/uclaacm/TeachLAFrontend/pull/644',
        },
      },
    },
    expectedOutput: 'opened pull request #644 in',
  },
  {
    data: {
      type: 'PullRequestReviewEvent',
      payload: {
        action: 'created',
        pull_request: {
          html_url: 'https://github.com/uclaacm/TeachLAFrontend/pull/642',
          number: 642,
        },
      },
    },
    expectedOutput: 'reviewed pull request #642 in',
  },
  {
    data: {
      type: 'PushEvent',
      payload: {
        size: 1,
      },
    },
    expectedOutput: 'pushed 1 commit to',
    testContext: 'single commits',
  },
  {
    data: {
      type: 'PushEvent',
      payload: {
        size: 2,
      },
    },
    expectedOutput: 'pushed 2 commits to',
    testContext: 'plural commits',
  },

];

describe('GitHub Event Action', () => {
  testCases.forEach(({data ,expectedOutput, testContext}) => {
    it(`renders correct string for ${data.type}${testContext ? ` (${testContext})` : ''}`, () => {
      const {container} = render(<GitHubEventAction payload={data.payload} type={data.type} />, {});
      expect(container.querySelector('span').textContent).toBe(expectedOutput);
    });
  });
});