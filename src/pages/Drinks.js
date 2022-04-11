import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';
import Recipes from '../components/Recipes/Recipes';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div className="drink-container">
      <HeaderPage
        title="Drinks"
        showSearch
      />
      <SearchBar type="drinks" />
      <Recipes type="drinks" />
      <BottomMenu />
    </div>
  );
}

export default Drinks;
