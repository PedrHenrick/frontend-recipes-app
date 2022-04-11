import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';
import Recipes from '../components/Recipes/Recipes';
import SearchBar from '../components/SearchBar';

function Foods(props) {
  console.log(props);
  return (
    <div className="food-container">
      <HeaderPage
        title="Foods"
        showSearch
      />
      <SearchBar type="meals" />
      <Recipes type="meals" />
      <BottomMenu />
    </div>
  );
}

export default Foods;
