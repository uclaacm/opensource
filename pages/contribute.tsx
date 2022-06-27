
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import ContributeProject from '../components/ContributeProject';
import ELink from '../components/ELink';
import Layout from '../components/Layout';
import { getGoodFirstIssueProjects, getGithubColors, GitHubColors, GFIProject } from '../util';
interface ContributeProps {
  gfiProjects: GFIProject[],
  githubColors: GitHubColors
}

function Contribute({ gfiProjects, githubColors }: ContributeProps): JSX.Element {
  const displayedgfiProjects = gfiProjects.map((project) =>
    <ContributeProject project={project} githubColors={githubColors} key={project.project.repo} />,
  );
  return (
    <Layout>
      <div className="container">
        <NextSeo
          title="contribute | open source at ACM at UCLA"
          description="get started by contributing to one of our projects"
          openGraph={{
            images: [{
              url: 'https://opensource.uclaacm.com/logo.png',
              width: 1200,
              height: 1200,
              alt: 'The ACM at UCLA logo',
            }],
            site_name: 'open source at ACM at UCLA',
          }}
        />
        <div className='row spaced-row'>
          <h1>get started </h1>
          <a href='#good-first-issues'><button>good first issues</button></a>
        </div>
        <hr />
        <h2>
          what is open source?
        </h2>
        <p>
          Open source software is code that is made freely available for <b>anyone</b> to
          use or enhance! Here at ACM, we take pride in <b>all</b> of our projects being open-source
          and open for anyone to work on.
        </p>
        <h2>
          what makes open source possible?
        </h2>
        <p>
          The main back bone of open source initiatives are tools that can make collaboration and sharing of code as
          simple as possible. Git and <ELink link='https://github.com/'>Github</ELink> are two really popular tools
          that do just that used by companies like Google, Meta, and more, and is what we use at ACM as well.
        </p>
        <h2>
          how can i contribute?
        </h2>
        <p>
          We&apos;ll quickly go over how we can use git/github to work on some open source projects, and if
          you want to learn more about the specifics of what we&apos;ll cover, you can check out {' '}
          <ELink link='https://git-scm.com/doc'>git&apos;s documentation</ELink>
          {' '} or our writeups on {' '}
          <ELink link='https://github.com/uclaacm/centralized-intern-training/tree/main/01_html_css_github#git-vs-github'>
            git workflows
          </ELink>
          {' '} and {' '}
          <ELink link='https://github.com/uclaacm/centralized-intern-training/tree/main/02_intermediate_css_github_workflows#github-as-a-collaboration-tool'>
            github as a collaboration tool
          </ELink>
          {' '}
          to get a closer look at what we&apos;re doing!
        </p>
        <h3>
          jumping into contributing on a project
        </h3>
        <p>
          There are thousands of open-source projects out there that it can get hard to even find where to start!
          Luckily, some <strong>repositories</strong>, or the main hub of projects, have <strong>issues</strong>, or
          project tasks, marked as <strong>good first issue</strong>.
          These are great starting points for people to hop in and contribute!
        </p>

        <h2 id='good-first-issues'>
          acm&apos;s projects w/ good first issues
        </h2>
        <div className='card'>
          <div className='card-body'>
            {displayedgfiProjects}
          </div>
        </div>

        <h2>contribution workflow</h2>
        <p>
          Repositories normally tell you how the steps you need to take to get to work, usually within their
          README.mdor their CONTRIBUTING.md but generally, there&apos;s generally a standard couple steps
          you&apos;ll have to take. For a detailed contribution guide, check out github&apos;s {' '}
          <ELink link='https://docs.github.com/en/get-started/quickstart/contributing-to-projects'>
            contribution guide
          </ELink>!
        </p>
        <h3>forking and cloning a repo</h3>
        <p>By clicking fork on a project that you want to contribute to, GitHub generates a personal copy of that
          repo under your account. To clone it onto your computer, you can click the code button above the list of files
          and run <code>git clone PROJECT_URL</code> to get it onto your machine.
        </p>
        <h3>branching, making changes</h3>
        <p>
          Generally, when you want to make a specific change to a project, you make a branch,
          so that you can work on a new feature without affecting other people&apos;s work.
          To do so, run the <code>git checkout -b BRANCH_NAME</code> command
          to generate a new branch or <code>git checkout BRANCH_NAME</code> to switch between branches.
        </p>
        <p>
          After you&apos;ve made your changes, run {' '}
          <code>git add .</code> then <code>git commit -m &quot;a short commit description&quot;</code> {' '}
          to take a snapshot of all the changes you&apos;ve made and <code>git push</code> to push the changes you
          made to GitHub.
        </p>
        <h3>making a pull request</h3>
        <p>
          Now that you&apos;ve successfully made the changes you want on your fork of the project,
          if you head over to the original project repository and click <strong>Open a pull request</strong>,
          you can put in a title and description of your changes.
        </p>
        <p>
          After making a pull request, the maintainers of the project will check if your code is up to snuff
          and request changes as necessary. Once they approve your changes however, you can merge your changes
          in and you&apos;ve successfully contributed to the project!
        </p>
        <h2>what are you waiting for? go work on some projects!</h2>

      </div>
    </Layout >
  );
}

export default Contribute;


export const getStaticProps: GetStaticProps = async () => {
  // TODO(mattxwang): change the auth scope and get members, etc.
  // see: https://docs.github.com/en/rest/reference/orgs
  const gfiProjects = await getGoodFirstIssueProjects();
  const githubColors = await getGithubColors();
  return {
    props: {
      gfiProjects,
      githubColors,
    },
    revalidate: 60,
  };
};

