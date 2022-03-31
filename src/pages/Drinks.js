import React from 'react';
import HeaderPage from '../components/Header';
import Recipes from '../components/Recipes/Recipes';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <HeaderPage
        title="Drinks"
        showSearch
      />
      <SearchBar type="drinks" />
      <Recipes />
    </div>
  );
}

export default Drinks;
