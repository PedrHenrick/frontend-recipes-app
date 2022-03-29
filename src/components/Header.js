import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import '../styles/headerPage.css';

function Header({ history: { push }, title }) {
  const [inputView, setInputView] = useState(false);
  return (
    <header className="headerPageAll">
      <section className="headerPage">
        <button
          type="button"
          onClick={ () => push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
          />
        </button>
        <h2
          data-testid="page-title"
        >
          { title }
        </h2>
        {
          title === 'Foods' || title === 'Explore Nationalities'
            ? (
              <button
                type="button"
                onClick={ () => setInputView(!inputView) }
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="searchIcon"
                />
              </button>
            ) : null
        }
      </section>
      {
        inputView === true
          ? (
            <input
              type="text"
              className="headerInput"
              data-testid="search-input"
            />
          ) : null
      }
    </header>
  );
}

export default withRouter(Header);

Header.defaultProps = {
  history: {},
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};
