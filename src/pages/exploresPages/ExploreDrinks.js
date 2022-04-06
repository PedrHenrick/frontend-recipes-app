import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import ExploreRecipes from '../../components/Recipes/ExploreRecipes';

function exploreDrinks() {
  return (
    <>
      <Header
        title="Explore Drinks"
        showSearch={ false }
      />
      <ExploreRecipes />
      <BottomMenu />
    </>
  );
}

export default exploreDrinks;
