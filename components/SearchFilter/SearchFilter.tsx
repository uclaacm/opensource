import React, { ChangeEvent, useEffect } from 'react';
import Searchbar from './Searchbar';
import { Project } from '../../util';

interface SearchFilterProps {
  projects: Project[];
  setFilteredProjects: (projectList: Project[]) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
}

function lowercaseRemove(s: string) {
  // takes a string, makes it all lowercase, and removes all - and _ characters, and
  // also removes whitespace

  let newString = s.toLowerCase();
  newString = newString.replace(/-|_|\s/g, '');
  return newString;
}

function SearchFilter({
  projects,
  setFilteredProjects,
  setSearchQuery,
  searchQuery,
}: SearchFilterProps): JSX.Element {
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterProjectsBySearchText = (project: Project) => {
    // helper function for filtering the projects

    // remove - and _ and white spaces from search, and make it lowercase to make it easier for the user to
    // search things without typing the exact name
    // e.g. if the user searches "devpathways" or "dev pathways" they should still be able to see "Dev-Pathways"
    const search = lowercaseRemove(searchQuery);

    const { name, description, lang, topics } = project;

    // can search by name, description, or language
    const lowercaseName = lowercaseRemove(name);
    const lowercaseDescription = lowercaseRemove(description);
    const lowercaseLang = lowercaseRemove(lang);

    if (
      lowercaseName.includes(search) ||
      lowercaseDescription.includes(search) ||
      lowercaseLang.includes(search)
    ) {
      return true;
    }

    // can also search by topic
    for (let i = 0; i < topics.length; i++) {
      const lowercaseTopic = lowercaseRemove(topics[i]);

      if (lowercaseTopic.includes(search)) {
        return true;
      }
    }

    return false;
  };

  // run the filter projects function every time the searchbar text changes
  useEffect(() => {
    const tempProjects = projects.filter(filterProjectsBySearchText);
    setFilteredProjects(tempProjects);
  }, [searchQuery]);

  return (
    <div>
      <Searchbar
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInput(e)}
      />
    </div>
  );
}

export default SearchFilter;
