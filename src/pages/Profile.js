import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Profile() {
  return (
    <div className="food-container">
      <HeaderPage
        title="Profile"
        showSearch={ false }
      />
      <BottomMenu />
    </div>

  );
}

export default Profile;
