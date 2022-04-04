import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';

function exploreDrinksIngredients() {
  return (
    <>
      <Header
        title="Explore Ingredients"
        showSearch={ false }
      />
      <BottomMenu />
    </>
  );
}

export default exploreDrinksIngredients;
