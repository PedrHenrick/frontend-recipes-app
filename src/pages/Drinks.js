import React from 'react';
import HeaderPage from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <HeaderPage
        title="Drinks"
        showSearch
      />
      <SearchBar type="drinks" />
    </div>
  );
}

export default Drinks;
