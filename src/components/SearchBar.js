import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import Button from './Forms/Button';
import Radio from './Forms/Radio';
import { fetchMealsOrDrinksByFirstLetter,
  fetchMealsOrDrinksByIngredient,
  fetchMealsOrDrinksByName } from '../services/api';

function SearchBar(props) {
  const { type, history } = props;
  const { searchInput } = useContext(recipesContext);
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
    let data;
    if (searchType === 'ingredient') {
      data = await fetchMealsOrDrinksByIngredient(type, searchInput);
    } else if (searchType === 'name') {
      data = await fetchMealsOrDrinksByName(type, searchInput);
    } else {
      data = await fetchMealsOrDrinksByFirstLetter(type, searchInput);
    }
    return data;
  };

  const searchClickedHandler = async () => {
    const data = await fetchData();
    let results = [];
    if (searchType === 'firstletter'
    && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      if (type === 'drinks') {
        const { drinks } = data;
        results = drinks;
      } else {
        const { meals } = data;
        results = meals;
      }
      redirectToRecipeDetails(results);
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
      />
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.shape({}),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default withRouter(SearchBar);
