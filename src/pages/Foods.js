import React from 'react';
import HeaderPage from '../components/Header';
import Recipes from '../components/Recipes/Recipes';
import SearchBar from '../components/SearchBar';

function Foods() {
  return (
    <div>
      <HeaderPage
        title="Foods"
        showSearch
      />
      <SearchBar type="meals" />
      <Recipes />
    </div>
  );
}

export default Foods;
