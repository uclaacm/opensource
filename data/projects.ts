import { Language, Project } from '../util';

// TODO(mattxwang): do we need this to be an array?
// a map? etc.
const projects: Array<Project> = [
  {
    name: "Buffer Buffet",
    description: "All of our projects are open-source! Literally, all of them.",
    repo: "https://github.com/uclaacm/buffer-buffet",
    link: "https://bufferbuffet.uclaacm.com/",
    image: "/projects/buffer-buffet.png",
    alt: "buffer buffet landing splash",
    lang: Language.JS,
    tech: [
      "react", "x86",
    ],
  },
  {
    name: "Design Styleguide",
    description: "All of our projects are open-source! Literally, all of them.",
    repo: "https://github.com/uclaacm/Styleguide",
    link: "https://design.uclaacm.com/",
    image: "/projects/styleguide.png",
    alt: "ACM at UCLA Styleguide homepage",
    lang: Language.SCSS,
    tech: [
      "eleventy",
    ],
  },
  {
    name: "Dev Pathways",
    description: "All of our projects are open-source! Literally, all of them.",
    repo: "https://github.com/uclaacm/dev-pathways",
    link: "https://dev-pathways.netlify.app/",
    image: "/projects/dev-pathways.png",
    alt: "Dev pathways homepage",
    lang: Language.JS,
    tech: [
      "react",
    ],
  },
  {
    name: "Cyber Platform",
    description: "All of our projects are open-source! Literally, all of them.",
    repo: "https://github.com/uclaacm/cyber-platform",
    link: "https://acmcyber.com/challenges/",
    image: "/projects/cyber-platform.png",
    alt: "Cyber Web Platform challenges page",
    lang: Language.RUST,
    tech: [
      "flask", "postgres", "warp",
    ],
  },
  {
    name: "Playnet",
    description: "All of our projects are open-source! Literally, all of them.",
    repo: "https://github.com/uclaacm/Playnet",
    link: "https://playnet.uclaacm.com/",
    image: "/projects/playnet.png",
    alt: "Lost in translation game on playnet platform",
    lang: Language.TS,
    tech: [
      "anime.js", "lottie", "react"
    ],
  },
  {
    name: "Teach Editor Backend",
    description: "All of our projects are open-source! Literally, all of them.",
    repo: "https://github.com/uclaacm/teach-la-go-backend",
    link: "https://github.com/uclaacm/teach-la-go-backend",
    image: "/projects/tla-editor-go.png",
    alt: "Postman documentation for the teach la editor",
    lang: Language.GO,
    tech: [
      "firebase",
    ],
  },
];

export default projects;
