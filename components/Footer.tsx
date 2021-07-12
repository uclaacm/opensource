import React from 'react';
import ELink from '../components/ELink';

function Footer(): JSX.Element {
  return (
    <footer>
      <div className="container">
        made by <ELink link="https://uclaacm.com">ACM at UCLA</ELink>, with <ELink link="https://nextjs.org/docs">Next.js</ELink>
      </div>
    </footer>
  );
}

export default Footer;
