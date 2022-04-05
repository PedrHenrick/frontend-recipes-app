import React, { useState } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [searchInput, setSearchInput] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const searchParams = {
    searchInput,
    setSearchInput,
  };

  return (
    <Provider
      value={ {
        searchParams,
        meal: {
          meals,
          setMeals,
        },
        drink: {
          drinks,
          setDrinks,
        },
        ingredientsStatus: {
          disabled: isDisabled,
          toggleButtonDisable: setIsDisabled,
        },
      } }
    >
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
