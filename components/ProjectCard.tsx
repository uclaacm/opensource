import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  name: string,
  description: string,
  repo: string,
  link: string,
  image: string,
  alt: string,
}

function ProjectCard({name, description, repo, link, image, alt}: ProjectCardProps): JSX.Element {
  return (
    <div className="card">
      <div className="row">
        <div className="col-6">
          <Image
            src={image}
            alt={alt}
            width="1000"
            height="800"
            layout="responsive" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h3>{name}</h3>
            <p>{description}</p>
            <a className="button" href={repo}>
              GitHub Repository
            </a>
            {" "}
            <a className="button" href={link}>
              Project Link
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;
