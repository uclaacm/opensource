import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import WordmarkLogo from '../public/acm_wordmark_chapter.svg';

function Navbar(): JSX.Element {
  // set states
  const [menuActive, setMenuActive] = useState(false);

  // switches mobile menu state
  const menuActivate = () => {
    setMenuActive(menuActive ? false : true);
  };

  return (
    <nav id="navbar">
      <section id="nav-container">
        <Link href="https://opensource.uclaacm.com/">
          <a id="nav-title" className="nav-section left" aria-label="acm home">
            <Image
              src={WordmarkLogo}
              width={180}
              height={60}
              alt="Open Source at ACM Home"
            />
          </a>
        </Link>

        <button
          className={menuActive ? 'active' : ''}
          id="hamburger"
          type="button"
          onClick={menuActivate}
          aria-label="navigation menu"
          aria-expanded={menuActive}
          tabIndex={0}
        >
          <span className="bar" id="bar-one"></span>
          <span className="bar" id="bar-two"></span>
          <span className="bar" id="bar-three"></span>
        </button>
        <section className={menuActive ? 'active' : ''} id="menu-modal">
          <ul
            className={`nav-items ${menuActive ? 'active' : ''}`}
            role="presentation"
          >
            <li>
              <Link href="https://www.uclaacm.com/" passHref>
                <button type="button" role="link" onClick={menuActivate}>
                  ACM Website
                </button>
              </Link>
            </li>
            <li>
              <Link href="/projects" passHref>
                <button type="button" role="link" onClick={menuActivate}>
                  Projects
                </button>
              </Link>
            </li>
            <li>
              <Link href="/contribute" passHref>
                <button type="button" role="link" onClick={menuActivate}>
                  Contribute
                </button>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/uclaacm">
                <a className="button button-transparent button-lg font-header">
                  GitHub
                </a>
              </Link>
            </li>
          </ul>
        </section>
      </section>
    </nav>
  );
}

export default Navbar;
