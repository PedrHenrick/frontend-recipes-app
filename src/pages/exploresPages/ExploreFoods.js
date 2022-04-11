import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import ExploreRecipes from '../../components/Recipes/ExploreRecipes';

function exploreFoods() {
  return (
    <div className="food-container">
      <Header
        title="Explore Foods"
        showSearch={ false }
      />
      <ExploreRecipes isMeal />
      <BottomMenu />
    </div>
  );
}

export default exploreFoods;
