import React from 'react';
import "./style.css"
type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className='SearchBar-Outer'>
      <div className='SearchBar-Wrapper'>
        <input id='SearchBar' type="text" placeholder="kategori ara...." value={value} onChange={onChange} />
        <div className='icon'>
          <img src="search.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
