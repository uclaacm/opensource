import { Endpoints } from '@octokit/types';
import GitHubEvent from '../components/GitHubEvent';

export interface Project {
  name: string;
  description: string;
  repo: string;
  link?: string;
  image: string;
  alt: string;
  lang: string;
  // TODO(mattxwang): if tech is an enum, does that make it easier to search/sort?
  topics: Array<string>;
}

export enum ACMCommitteeTopics {
  AI = 'acm-ai',
  CYBER = 'acm-cyber',
  DESIGN = 'acm-design',
  HACK = 'acm-hack',
  ICPC = 'acm-icpc',
  STUDIO = 'acm-studio',
  TEACH_LA = 'teach-la',
  W = 'acm-w',
}

export interface GitHubColors {
  [lang: string]: GitHubColorData
}

interface GitHubColorData {
  color: string;
  url: string;
}

export type GitHubEvent =
  Endpoints['GET /orgs/{org}/events']['response']['data'][number];

export type GitHubEventPayload = GitHubEvent['payload'];

// Revalidate every three hours (in seconds)
export const REVALIDATE_DAILY = 3 * 60 * 60;