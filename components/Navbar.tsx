import Link from 'next/link';
import React from 'react';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">
          <a>
            <img src="https://design.uclaacm.com/assets/logos/acm-logo-wordmark-extended.png" alt="ACM at UCLA Logo" />
          </a>
        </Link>
      </div>
      <div className="navbar-items">
        <div className="navbar-link">
          <Link href="/projects">
            <a>projects</a>
          </Link>
          <Link href="/contribute">
            <a>contribute</a>
          </Link>
          <Link href="https://github.com/uclaacm">
            <button>GitHub</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
