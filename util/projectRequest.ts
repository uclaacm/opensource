import { Octokit } from '@octokit/core';
import { paginateRest } from '@octokit/plugin-paginate-rest';
import githubColorsFixture from '../data/githubColors.json';
import { Project, ACMCommitteeTopics, GitHubColors, GitHubRepo, GitHubIssue, GFIProject } from './types';

//get projects within uclaacm org
export async function getProjects(): Promise<Project[]> {
  const PaginatedOctokit = Octokit.plugin(paginateRest);
  const octokit = new PaginatedOctokit();
  const projectsResponse = await octokit.paginate('GET /orgs/{org}/repos', {
    org: 'uclaacm',
    per_page: 100,
  });

  const projects = mapReposToProjects(projectsResponse);
  return projects;
}

//search uclaacm org for good first issues, repos which contain gfis, and match them up
export async function getGoodFirstIssueProjects(): Promise<GFIProject[]> {
  const PaginatedOctokit = Octokit.plugin(paginateRest);
  const octokit = new PaginatedOctokit();
  const gfiIssuesSearchQuery = 'org:uclaacm+label:"good+first+issue"+is:open';
  const gfiIssuesResponse = await octokit.paginate('GET /search/issues', {
    q: gfiIssuesSearchQuery,
  }) as GitHubIssue[];
  const gfiReposSearchQuery = 'good-first-issues:>0+org:uclaacm';
  const gfiReposResponse = await octokit.paginate('GET /search/repositories', {
    q: gfiReposSearchQuery,
  }) as GitHubRepo[];
  const repoMap = new Map<string, GitHubRepo>();
  //turn the gfiReposResponse into a map of url and the entire repo
  for (const repo of gfiReposResponse){
    repoMap.set(repo.url,repo);
  }
  const gfiProjects = mapIssuesToProjects(gfiIssuesResponse, repoMap);
  return gfiProjects;
}

function mapIssuesToProjects(issues: GitHubIssue[], repoMap: Map<string, GitHubRepo>) : GFIProject[]{
  //turn the issues into a map of projects and a list of issues associated with it
  const mappedRepos = new Map<string, GitHubIssue[]>();
  // console.log(issues);
  if(issues.length ==0){
    //console.error('No open good first issues!');
    return [];
  }
  for (const issue of issues){
    const issueRepoURL = issue.repository_url;
    //if map already contains that project, append to array of issues, or make a new array containing it
    mappedRepos.set(issueRepoURL,[...mappedRepos.get(issueRepoURL) ?? [], issue]);
  }

  const mapIter = mappedRepos.entries();

  //turn everything into a gfiProject[]
  const gfis : GFIProject[] = [];
  let itVal = mapIter.next();
  while(!itVal.done){
    const [repoUrl, repoIssues] = itVal.value;
    const correspondingRepo = repoMap.get(repoUrl);
    if(!correspondingRepo){
      //console.error('Repo Map went wrong!');
      return gfis;
    }
    const correspondingProject = convertRepoToProject(correspondingRepo);
    gfis.push({
      issues: repoIssues,
      project: correspondingProject,
      repoURL: repoUrl,
    });
    itVal = mapIter.next();
  }
  return gfis;
}

function convertRepoToProject(repo: GitHubRepo): Project {
  return repo.homepage
    ? {
      name: repo.name,
      description: repo.description ?? '',
      link: repo.homepage ?? '',
      repo: repo.html_url,
      lang: repo.language ?? '',
      topics: repo.topics ?? [],
      image: getImageFromTopics(repo.topics).image,
      alt: getImageFromTopics(repo.topics).alt,
    }
    : {
      name: repo.name,
      description: repo.description ?? '',
      repo: repo.html_url ?? '',
      lang: repo.language ?? '',
      topics: repo.topics ?? [],
      image: getImageFromTopics(repo.topics).image,
      alt: getImageFromTopics(repo.topics).alt,
    };
}

function mapReposToProjects(repos: GitHubRepo[]): Project[] {
  if (!repos || repos.length < 1) return [];
  const filteredData = repos.filter((repo) => !repo.archived);
  const sortedData = filteredData.sort(
    (a, b) =>
      new Date(b.updated_at as string).getTime() - new Date(a.updated_at as string).getTime(),
  );
  return sortedData.map((repo) => convertRepoToProject(repo),
  );
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

export function getImageFromTopics(topics: string[] | undefined): ImageInfo {
  if (topics) {
    for (const topic of topics) {
      const committeeImg = topicToImg(topic);
      if (committeeImg) return committeeImg;
    }
  }
  //return acm logo if no committee topics
  return {
    image: '/logo.png',
    alt: "ACM @ UCLA's Logo",
  } as ImageInfo;
}
