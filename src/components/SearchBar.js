import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import Button from './Forms/Button';
import Radio from './Forms/Radio';
import { fetchMealsOrDrinksByFirstLetter,
  fetchMealsOrDrinksByIngredient,
  fetchMealsOrDrinksByName } from '../services/api';
import { getMealsOrDrinks } from '../helpers/helpers';

const MAX_RECIPES = 12;

function SearchBar(props) {
  const { type, history } = props;
  const { meal, drink, searchParams: { searchInput } } = useContext(recipesContext);
  const { setMeals } = meal;
  const { setDrinks } = drink;
  const [searchType, setSearchType] = useState('');

  const inputChangeHandler = ({ target }) => {
    setSearchType(target.value);
  };

  const redirectToRecipeDetails = (results) => {
    const { location: { pathname }, push } = history;
    let recipeId;
    if (results.length === 1) {
      recipeId = type === 'meals' ? results[0].idMeal : results[0].idDrink;
      push(`${pathname}/${recipeId}`);
    }
  };

  const fetchData = async () => {
    try {
      let data;
      if (searchType === 'ingredient') {
        data = await fetchMealsOrDrinksByIngredient(type, searchInput);
      } else if (searchType === 'name') {
        data = await fetchMealsOrDrinksByName(type, searchInput);
      } else {
        data = await fetchMealsOrDrinksByFirstLetter(type, searchInput);
      }
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const saveMealsOrDrinks = (results) => {
    if (type === 'drinks') {
      const drinks = results.filter((_element, index) => index < MAX_RECIPES);
      setDrinks(drinks);
    } else if (type === 'meals') {
      const meals = results.filter((_element, index) => index < MAX_RECIPES);
      setMeals(meals);
    }
  };
  const searchClickedHandler = async () => {
    try {
      const data = await fetchData();
      const results = getMealsOrDrinks(type, data, searchType);

      if (searchType === 'firstletter'
    && searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (results?.length === 1) {
        redirectToRecipeDetails(results);
      } else if (results?.length > 0) {
        saveMealsOrDrinks(results);
      }

      if (!results || results?.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="search-container">
      <Radio
        inputId="ingredientsearch"
        inputLabel="Ingredient"
        inputName="search"
        dataTestid="ingredient-search-radio"
        changed={ inputChangeHandler }
        radioValue="ingredient"
      />
      <Radio
        inputId="recipesearch"
        inputLabel="Name"
        inputName="search"
        dataTestid="name-search-radio"
        changed={ inputChangeHandler }
        radioValue="name"
      />
      <Radio
        inputId="firstlettersearch"
        inputLabel="First Letter"
        inputName="search"
        dataTestid="first-letter-search-radio"
        changed={ inputChangeHandler }
        radioValue="firstletter"
      />
      <Button
        btnName="Search"
        dataTestid="exec-search-btn"
        clicked={ searchClickedHandler }
      >
        Search
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default withRouter(SearchBar);
