import React from 'react';
import Button from './Forms/Button';
import Radio from './Forms/Radio';

function SearchBar() {
  return (
    <div className="search-container">
      <Radio
        inputId="ingredientsearch"
        inputLabel="Ingredient"
        inputName="search"
        dataTestid="ingredient-search-radio"
      />
      <Radio
        inputId="recipesearch"
        inputLabel="Name"
        inputName="search"
        dataTestid="name-search-radio"
      />
      <Radio
        inputId="firstlettersearch"
        inputLabel="First Letter"
        inputName="search"
        dataTestid="first-letter-search-radio"
      />

      <Button btnName="Search" dataTestid="exec-search-btn" />

    </div>
  );
}

export default SearchBar;
