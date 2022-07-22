import { Octokit } from '@octokit/core';
import { paginateRest } from '@octokit/plugin-paginate-rest';
// import {EndpointOptions} from '@octokit/types';
import githubColorsFixture from '../data/githubColors.json';
import { Project, ACMCommitteeTopics, GitHubColors, GitHubRepo } from './types';

async function getGithubRepos(request: string, defaultUseUclaLogo: boolean): Promise<Project[]> {
  const PaginatedOctokit = Octokit.plugin(paginateRest);
  const octokit = new PaginatedOctokit();

  const response: GitHubRepo[] = await octokit.paginate('GET /search/repositories?q=ucla-opensource+in:topics', {
    per_page: 100,
  });

  const filteredData = response.filter((repo) => !repo.archived);
  const sortedData = filteredData.sort(
    (a, b) =>
      new Date(b.updated_at as string).getTime() - new Date(a.updated_at as string).getTime(),
  );
  return sortedData.map((repo) => ({
    name: repo.name,
    description: repo.description ?? '',
    link: repo.homepage ?? '',
    repo: repo.html_url,
    lang: repo.language ?? '',
    topics: repo.topics ?? [],
    image: getImageFromTopics(repo.topics, defaultUseUclaLogo).image,
    alt: getImageFromTopics(repo.topics, defaultUseUclaLogo).alt,
  }),
  );
}

export async function getUclaOpenSource(): Promise<Project[]> {
  return getGithubRepos('GET /search/repositories?q=ucla-opensource+in:topics', true);
}

export async function getProjects(): Promise<Project[]> {
  return getGithubRepos('GET /orgs/uclaacm/repos', false);
}

export async function getGithubColors(): Promise<GitHubColors> {
  const githubColorsResponse = await fetch(
    'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json',
  );
  return githubColorsResponse.status === 200
    ? await githubColorsResponse.json()
    : githubColorsFixture;
}

interface ImageInfo {
  image: string;
  alt: string;
}

function topicToImg(topic: string): ImageInfo | false {
  switch (topic) {
    case ACMCommitteeTopics.AI:
      return {
        image: '/committee-logos/ai-logo.png',
        alt: 'ACM AI Logo',
      };
    case ACMCommitteeTopics.CYBER:
      return {
        image: '/committee-logos/cyber-logo.png',
        alt: 'ACM Cyber Logo',
      };
    case ACMCommitteeTopics.DESIGN:
      return {
        image: '/committee-logos/design-logo.png',
        alt: 'ACM Design Logo',
      };
    case ACMCommitteeTopics.HACK:
      return {
        image: '/committee-logos/hack-logo.png',
        alt: 'ACM Hack Logo',
      };
    case ACMCommitteeTopics.ICPC:
      return {
        image: '/committee-logos/icpc-logo.png',
        alt: 'ACM ICPC Logo',
      };
    case ACMCommitteeTopics.STUDIO:
      return {
        image: '/committee-logos/studio-logo.png',
        alt: 'ACM Studio Logo',
      };
    case ACMCommitteeTopics.TEACH_LA:
      return {
        image: '/committee-logos/teachla-logo.png',
        alt: 'ACM Teach LA Logo',
      };
    case ACMCommitteeTopics.W:
      return {
        image: '/committee-logos/w-logo.png',
        alt: 'ACM W Logo',
      };
    default:
      return false;
  }
}

export function getImageFromTopics(topics: string[] | undefined, defaultUseUclaLogo: boolean): ImageInfo {
  if (topics) {
    for (const topic of topics) {
      const committeeImg = topicToImg(topic);
      if (committeeImg) return committeeImg;
    }
  }
  //return acm logo if no committee topics
  return defaultUseUclaLogo ? {
    image: '/ucla-logo.jpeg',
    alt: 'UCLA Bruin Logo'}
    : {
      image: '/logo.png',
      alt: "ACM @ UCLA's Logo",
    };
}
