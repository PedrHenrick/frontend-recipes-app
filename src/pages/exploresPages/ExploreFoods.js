import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import ExploreRecipes from '../../components/Recipes/ExploreRecipes';

function exploreFoods() {
  return (
    <>
      <Header
        title="Explore Foods"
        showSearch={ false }
      />
      <ExploreRecipes isMeal />
      <BottomMenu />
    </>
  );
}

export default exploreFoods;
