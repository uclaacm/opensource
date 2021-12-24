import { Octokit } from '@octokit/core';
import { Project, ACMCommitteeTopics } from './types';

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
        image: getImageFromTopics(repo.topics).image,
        alt: getImageFromTopics(repo.topics).alt,
      } as Project),
  ) as Project[];
}

interface ImageInfo {
  image: string;
  alt: string;
}

function topicToImg(topic: string) {
  switch (topic) {
    case ACMCommitteeTopics.AI:
      return {
        image: '/committee-logos/ai-logo.png',
        alt: 'ACM AI Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.CYBER:
      return {
        image: '/committee-logos/cyber-logo.png',
        alt: 'ACM Cyber Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.DESIGN:
      return {
        image: '/committee-logos/design-logo.png',
        alt: 'ACM Design Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.HACK:
      return {
        image: '/committee-logos/hack-logo.png',
        alt: 'ACM Hack Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.ICPC:
      return {
        image: '/committee-logos/icpc-logo.png',
        alt: 'ACM ICPC Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.STUDIO:
      return {
        image: '/committee-logos/studio-logo.png',
        alt: 'ACM Studio Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.TEACH_LA:
      return {
        image: '/committee-logos/teachla-logo.png',
        alt: 'ACM Teach LA Logo',
      } as ImageInfo;
    case ACMCommitteeTopics.W:
      return {
        image: '/committee-logos/w-logo.png',
        alt: 'ACM W Logo',
      } as ImageInfo;
    default:
      return false;
  }
}

export function getImageFromTopics(topics: string[]): ImageInfo {
  for (const topic of topics) {
    const committeeImg = topicToImg(topic);
    if (committeeImg) return committeeImg;
  }
  //return acm logo if no committee topics
  return {
    image: '/logo.png',
    alt: "ACM @ UCLA's Logo",
  } as ImageInfo;
}
