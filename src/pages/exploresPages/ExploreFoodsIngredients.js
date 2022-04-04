import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';

function exploreFoodsIngredients() {
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

export default exploreFoodsIngredients;
