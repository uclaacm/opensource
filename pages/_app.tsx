import {AppProps} from 'next/app';
import React from 'react';
import '../styles/globals.css';

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps): JSX.Element  {
  return <Component {...pageProps} />;
}

export default App;
