import React from 'react';
import Home from '../../pages/index';
import { render } from '../testUtils';

// next/image mock from https://bradgarropy.com/blog/mocking-nextjs
jest.mock(
  'next/image',
  () =>
    function Image({src, alt}: {src: string, alt: string}) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    },
);


describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home numRepos={0} recentEvents={[]} projNumToDisplay={0} />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
