import React from 'react';
import Header from '../components/Header';

function Favorite() {
  return (
    <main>
      <Header
        title="Favorite Recipes"
        showSearch={ false }
      />
      <h1>Favorites</h1>
    </main>
  );
}

export default Favorite;
