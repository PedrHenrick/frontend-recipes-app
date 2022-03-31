import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Profile() {
  return (
    <>
      <HeaderPage
        title="Profile"
        showSearch={ false }
      />
      <BottomMenu />
    </>

  );
}

export default Profile;
