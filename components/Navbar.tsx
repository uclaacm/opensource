import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import WordmarkLogo from '../public/acm_wordmark_chapter.svg';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="https://opensource.uclaacm.com/">
          <a className="force-child-display-block">
            <Image
              src={WordmarkLogo}
              width={180}
              height={60}
              alt="Open Source at ACM Home"
            />
          </a>
        </Link>
      </div>
      <div className="navbar-items">
        <div className="navbar-link">
          <Link href="https://www.uclaacm.com/">
            <a>acm website</a>
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
