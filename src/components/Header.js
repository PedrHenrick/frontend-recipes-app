import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/headerPage.css';
import Input from './Forms/Input';
import recipesContext from '../context/recipesContext';
import Icon from './Icon';

function Header({ history: { push }, title, showSearch }) {
  const [inputView, setInputView] = useState(false);
  const { searchParams } = useContext(recipesContext);
  const { searchInput, setSearchInput } = searchParams;

  return (
    <header className="headerPageAll" data-testid="heading">
      <section className="headerPage">
        <button
          className="profile__btn"
          type="button"
          onClick={ () => push('/profile') }
        >
          <Icon iconClass="profile__icon" iconName="user" />
        </button>
        <h2
          data-testid="page-title"
          className="pageTitle"
        >
          { title }
        </h2>
        {
          showSearch
            ? (
              <button
                className="profile__btn"
                type="button"
                onClick={ () => setInputView(!inputView) }
              >
                <Icon iconClass="profile__search" iconName="magnifying-glass" />
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
