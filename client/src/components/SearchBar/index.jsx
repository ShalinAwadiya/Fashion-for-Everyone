/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar({ value, changeValue }) {
  return (
    <div className="search_panel">
      <SearchIcon className="search_icon" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={changeValue}
      />
    </div>
  );
}
