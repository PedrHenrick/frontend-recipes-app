import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Explore() {
  return (
    <>
      <HeaderPage
        title="Explore"
        showSearch={ false }
      />
      <BottomMenu />
    </>
  );
}

export default Explore;
