import { Octokit } from '@octokit/core';
import { Project } from './types';
export async function getProjects(): Promise<Project[]> {
  const octokit = new Octokit();
  const projectsResponse = await octokit.request('GET /orgs/{org}/repos', {
    org: 'uclaacm',
    per_page: 100,
  });
  const sortedData = projectsResponse.data.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  return sortedData.map(
    (repo) =>
      ({
        name: repo.name,
        description: repo.description,
        link: repo.homepage || null,
        repo: repo.html_url,
        lang: repo.language,
        topics: repo.topics,
        image: repo.owner.avatar_url,
        alt: repo.owner.name || null,
      } as Project),
  ) as Project[];
}
