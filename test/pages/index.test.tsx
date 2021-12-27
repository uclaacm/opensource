import React from 'react';
import githubColorsData from '../../data/githubColors.json';
import Home from '../../pages/index';
import { getImageFromTopics } from '../../util';
import projectsData from '../fixtures/RepositoriesResponse.json';
import { render } from '../testUtils';

const filteredData = projectsData.filter((repo) => !repo.archived);
const sortedData = filteredData.sort(
  (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
);
const projects = sortedData.map((repo) =>
  repo.homepage
    ? {
      name: repo.name,
      description: repo.description,
      link: repo.homepage || null,
      repo: repo.html_url,
      lang: repo.language,
      topics: repo.topics,
      image: getImageFromTopics(repo.topics).image,
      alt: getImageFromTopics(repo.topics).alt,
    }
    : {
      name: repo.name,
      description: repo.description,
      repo: repo.html_url,
      lang: repo.language,
      topics: repo.topics,
      image: getImageFromTopics(repo.topics).image,
      alt: getImageFromTopics(repo.topics).alt,
    },
);

describe('Home page', () => {
  it('matches snapshot', async () => {
    const { asFragment } = render(
      <Home
        numRepos={0}
        recentEvents={[]}
        projects={projects}
        githubColors={githubColorsData}
      />,
      {},
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
