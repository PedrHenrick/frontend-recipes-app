import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import '../styles/headerPage.css';
import Input from './Forms/Input';
import recipesContext from '../context/recipesContext';

function Header({ history: { push }, title, showSearch }) {
  const [inputView, setInputView] = useState(false);
  const { searchParams } = useContext(recipesContext);
  const { searchInput, setSearchInput } = searchParams;

  return (
    <header className="headerPageAll" data-testid="heading">
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
          showSearch
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
      { inputView && (<Input
        inputClass="headerInput"
        dataTestid="search-input"
        changed={ ({ target }) => setSearchInput(target.value) }
        inputValue={ searchInput }
      />)}
    </header>
  );
}

export default withRouter(Header);

Header.defaultProps = {
  history: {},
  showSearch: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  showSearch: PropTypes.bool,
};
