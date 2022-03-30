import React, { useState } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [searchInput, setSearchInput] = useState('');

  const searchParams = {
    searchInput,
    setSearchInput,
  };

  return (
    <Provider value={ searchParams }>
      { children }
    </Provider>
  );
}

export default RecipesProvider;

RecipesProvider.defaultProps = {
  children: {},
};

RecipesProvider.propTypes = {
  children: PropTypes.element,
};
