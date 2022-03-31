import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Drinks() {
  return (
    <>
      <HeaderPage
        title="Drinks"
        showSearch
      />
      <BottomMenu />
    </>
  );
}

export default Drinks;
