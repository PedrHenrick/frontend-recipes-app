import React from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;

  return (
    <Provider>
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
