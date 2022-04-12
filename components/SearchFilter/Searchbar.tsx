import React, { ChangeEvent } from 'react';

interface SearchbarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Searchbar({value, onChange}: SearchbarProps): JSX.Element {

  return (
    <div className="searchbar">
      <input
        placeholder="search"
        type="search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Searchbar;