import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRecipeRecommendeds } from '../services/api';

import recipesContext from './recipesContext';

const MAX_RECIPES = 12;
function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [searchInput, setSearchInput] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const searchParams = {
    searchInput,
    setSearchInput,
  };

  useEffect(() => {
    getRecipeRecommendeds('meals').then((results) => {
      const recipesResults = results.meals.slice(0, MAX_RECIPES);
      setRecipes(recipesResults);
    });
  }, []);

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
        recipes: {
          recipeList: recipes,
          setRecipes,
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
