import Link from 'next/link';
import React from 'react';

export interface ELinkProps {
  link: string;
  children: React.ReactNode;
}

function ELink ({link, children}: ELinkProps): JSX.Element {
  const linkProps = {
    rel: 'noopener noreferrer',
    target: '_blank',
  };
  return (
    <Link href={link} {...linkProps}>
      {children}
    </Link>
  );

}

export default ELink;
