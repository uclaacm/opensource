import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import WordmarkLogo from '../public/acm-logo-wordmark-extended.png';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">
          <a className='force-child-display-block'>
            <Image src={WordmarkLogo} width={106} height={40} alt="Open Source at ACM Home" />
          </a>
        </Link>
      </div>
      <div className="navbar-items">
        <div className="navbar-link">
          <Link href="https://uclaacm.com">
            <a>home</a>
          </Link>
          <Link href="/projects">
            <a>projects</a>
          </Link>
          <Link href="/contribute">
            <a>contribute</a>
          </Link>
          <Link href="https://github.com/uclaacm" passHref>
            <button>GitHub</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
