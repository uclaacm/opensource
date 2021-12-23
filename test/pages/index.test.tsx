import React from 'react';
import Home from '../../pages/index';
import { getProjects } from '../../util';
import { render } from '../testUtils';

describe('Home page', () => {
  it('matches snapshot', async () => {
    const projects = await getProjects();
    const { asFragment } = render(<Home numRepos={0} recentEvents={[]} projects={projects} /> , {});
    expect(asFragment()).toMatchSnapshot();
  });
});
