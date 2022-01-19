import React from 'react';
import sinon from 'sinon';
import Home from '../../pages/index';
import { render } from '../testUtils';

describe('Home page', () => {
  it('matches snapshot', () => {
    sinon.stub(Math, 'random').returns(0);
    const { asFragment } = render(<Home numRepos={0} recentEvents={[]} />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
