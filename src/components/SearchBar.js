import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import Button from './Forms/Button';
import Radio from './Forms/Radio';
import { fetchMealsOrDrinksByFirstLetter,
  fetchMealsOrDrinksByIngredient,
  fetchMealsOrDrinksByName } from '../services/api';

function SearchBar(props) {
  const { type } = props;
  const { searchInput } = useContext(recipesContext);
  const [searchType, setSearchType] = useState('');

  console.log(type);

  const inputChangeHandler = ({ target }) => {
    setSearchType(target.value);
  };

  const fetchData = async () => {
    let data;
    console.log(type, searchInput);
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
    if (searchType === 'firstletter'
    && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    console.log(data);
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
  type: PropTypes.string.isRequired,
};

export default SearchBar;
