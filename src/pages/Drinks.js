import React from 'react';
import BottomMenu from '../components/BottomMenu';
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
      <BottomMenu />
    </div>
  );
}

export default Drinks;
