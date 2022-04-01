import React from 'react';
import BottomMenu from '../components/BottomMenu';
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
      <BottomMenu />
    </div>
  );
}

export default Foods;
