import React, { ChangeEvent } from 'react';

interface SearchbarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Searchbar({value, onChange}: SearchbarProps): JSX.Element {

  return (
    <div className="searchbar">
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Searchbar;