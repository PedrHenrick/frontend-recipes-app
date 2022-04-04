import React from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';

function exploreFoods() {
  return (
    <>
      <Header
        title="Explore Foods"
        showSearch={ false }
      />
      <BottomMenu />
    </>
  );
}

export default exploreFoods;
