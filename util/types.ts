export interface Project {
  name: string,
  description: string,
  repo: string,
  link: string,
  image: string,
  alt: string,
  lang: Language,
  // TODO(mattxwang): if tech is an enum, does that make it easier to search/sort?
  tech?: Array<string>,
}

export enum Language {
  GO = "go",
  HTML = "html",
  JS = "js",
  RUST= "rust",
  SCSS = "scss",
  TS = "ts",
}
