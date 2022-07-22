# open-source at acm (at ucla)

hello friends! this is a ~ top-secret ~ project that has three key goals:

1. to showcase the open-source projects, events, and culture at [acm at UCLA](https://uclaacm.com)
2. so that matt (@mattxwang) can test out [Next.js](https://nextjs.org/) (for possible use in other acm projects)!
3. to test out [WestwoodCSS](https://github.com/uclaacm/WestwoodCSS), a CSS framework made by acm at ucla!

Eventually, matt's got bigger ideas - he'd love to showcase how awesome OSS is at UCLA!

## Dev Notes

### Setup

We use the typical node project workflow, but with [yarn](https://yarnpkg.com/). To run a local dev copy,

```sh
$ git clone https://github.com/uclaacm/opensource.git # or use ssh!
...
$ cd opensource
...
$ yarn install
...
$ yarn dev
...
```

### Stack

This app is built with [Next.js](https://nextjs.org/), a framework built on top of [React](https://reactjs.org/). We enforce [Typescript](https://www.typescriptlang.org/) throughout the project, and have a strict linter with [ESLint](https://eslint.org/) - enforced as a pre-commit hook with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged#readme). The CSS framework used is an alpha version [WestwoodCSS](https://github.com/uclaacm/WestwoodCSS), ACM Design's own CSS framework!

We bootstrapped this app with [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app) using the `with-typescript-eslint-jest` template. There are some other goodies too, like Prettier and Jest (the latter we'd use more seriously in production).

This app is deployed on [Netlify](https://www.netlify.com/) using their [Next.js plugin](https://github.com/netlify/netlify-plugin-nextjs); in particular, this let's us (kind of) [take advantage of ISR](https://www.netlify.com/blog/2021/03/08/incremental-static-regeneration-its-benefits-and-its-flaws/).

### misc

Some small notes on how I've been writing the app so far:

* I use [octokit](https://github.com/octokit/octokit.js) to wrap GitHub's API to get information about the `uclaacm` org. So far, all of this is ISR'd :)
* [WestwoodCSS](https://github.com/uclaacm/WestwoodCSS) is still in early alpha, so:
  * there is no documentation (other than reading the source file)
  * there is no guarantee of forwards-compatability with new versions of WestwoodCSS
* so far, there is no unified types file; most component types live in the component file, and there is some relevant typing in `util/types.ts`
* the mapping of event data to human-readable components in `components/GitHubEventAction.tsx` is manually done (and currently, manually typed). I haven't *really* looked into it, but...
  * I'm sure there are ways we can use the generated types for `octokit` to flesh out the event types, instead of manually picking/resolving fields
  * there may even be a way to programatically explore types and do the string generation in a much more natural way!
  * most of the actual copy isn't here yet! i'm mostly just fiddling with code :)
  * to ensure the website doesn't break if the Octokit api fails, the information from the api calls are generated in getStaticProps() for both projects.tsx and index.tsx and stored statically in /test/fixtures
  * All of ACM's projects, generated in projects.tsx, are stored in /test/fixtures/AllProjects.json, while info about Events and ACM as an org, generated in index.tsx, are stored in /test/fixtures/eventResponse.json and /test/fixtures/orgResponse.json

Want to give a quick shoutout to [Bryan Pan](https://bryanpan.co/) of [Creative Labs](https://www.creativelabsucla.com/) - he's been a big pusher of Next and a great friend to ACM!

## Licensing

This code is under the MIT License, so you can generally use it as you see fit (including forking, copying, etc.). I would love to know if you did - send matt an email at [matt@matthewwang.me](mailto:matt@matthewwang.me).
