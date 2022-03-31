import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Foods() {
  return (
    <>
      <HeaderPage
        title="Foods"
        showSearch
      />
      <BottomMenu />
    </>
  );
}

export default Foods;
