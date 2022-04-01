import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';

function exploreDrinks() {
  return (
    <>
      <Header
        title="Explore Drinks"
        showSearch={ false }
      />
      <BottomMenu />
    </>
  );
}

export default exploreDrinks;
