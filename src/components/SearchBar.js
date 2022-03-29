import React from 'react';
import Button from './Forms/Button';
import Radio from './Forms/Radio';

function SearchBar() {
  return (
    <div className="search-container">
      <Radio
        inputId="ingredientsearch"
        inputLabel="Ingredients"
        inputName="search"
        dataTestid="ingredient-search-radio"
      />
      <Radio
        inputId="recipesearch"
        inputLabel="Recipes"
        inputName="search"
        dataTestid="name-search-radio"
      />
      <Radio
        inputId="firstlettersearch"
        inputLabel="By First Letter"
        inputName="search"
        dataTestid="first-letter-search-radio"
      />

      <Button btnName="Search" />

    </div>
  );
}

export default SearchBar;
