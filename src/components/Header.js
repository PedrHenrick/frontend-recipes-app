import React from 'react';
// import PropTypes from 'prop-types';

import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import '../styles/headerPage.css';

function Header() {
  return (
    <header className="headerPage">
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
        />
      </button>

      <h2
        data-testid="page-title"
      >
        Foods
      </h2>

      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img
          src={ searchIcon }
          alt="searchIcon"
        />
      </button>
    </header>
  );
}

export default Header;

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };
