import Link from 'next/link';
import React from 'react';

export interface ELinkProps {
  link: string | null;
  children: React.ReactNode;
}

function ELink({ link, children }: ELinkProps): JSX.Element {
  const linkProps = {
    rel: 'noopener noreferrer',
    target: '_blank',
  };
  return link ? (
    <Link href={link}>
      <a {...linkProps}>{children}</a>
    </Link>
  ) : (
    <>{children}</>
  );
}

export default ELink;
