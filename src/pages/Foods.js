import React from 'react';
import HeaderPage from '../components/Header';
import SearchBar from '../components/SearchBar';

function Foods() {
  return (
    <div>
      <HeaderPage
        title="Foods"
        showSearch
      />
      <SearchBar type="meals" />
    </div>
  );
}

export default Foods;
