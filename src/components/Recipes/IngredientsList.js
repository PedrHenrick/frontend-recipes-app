import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../Forms/CheckBox';
import '../../styles/recipes.css';
import { getIngredientsAndMeasurements,
  saveIngredientsInStorage } from '../../helpers/helpers';

function IngredientsList(props) {
  const { recipe, isMeal } = props;
  const recipeType = isMeal ? 'meals' : 'cocktails';
  const type = isMeal ? 'Meal' : 'Drink';
  const recipeId = recipe[`id${type}`];
  const [ingredients, measurements] = getIngredientsAndMeasurements(recipe);
  const [isChecked, setIsChecked] = useState(false);
  const storage = localStorage.getItem(recipeType) ?? false;

  const checkIngredient = (ingredient) => {
    if (storage) {
      const ingredientsInStorage = JSON.parse(storage)[recipeId];
      return ingredientsInStorage?.includes(ingredient);
    }
    return isChecked;
  };

  const inputChangeHandler = ({ target }) => {
    setIsChecked(target.checked);
    saveIngredientsInStorage(target, recipeId, recipeType);
  };

  const renderIngredients = () => ingredients.map((ingredient, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-step` }
    >
      <CheckBox
        inputType="checkbox"
        inputValue={ ingredient }
        changed={ inputChangeHandler }
        isChecked={ checkIngredient(ingredient) }
      />
      {ingredient}
      {' - '}
      {measurements[index]}
    </li>
  ));

  return (
    <ul className="recipe-progress__list">
      { renderIngredients() }
    </ul>
  );
}

IngredientsList.defaultProps = {
  isMeal: false,
};

IngredientsList.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
  isMeal: PropTypes.bool,
};

export default IngredientsList;
