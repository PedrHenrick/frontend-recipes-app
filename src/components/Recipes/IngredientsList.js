import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Forms/Input';
import '../../styles/recipes.css';

function IngredientsList(props) {
  const { recipe, isMeal } = props;

  const inputChangeHandler = ({ target }) => {
    const recipeType = isMeal ? 'meals' : 'cocktails';
    const type = isMeal ? 'Meal' : 'Drink';
    const recipeId = recipe[`id${type}`];
    const recipeIngredients = {};

    const storage = localStorage.getItem(recipeType) ?? false;

    if (target.checked) {
      if (!storage) {
        recipeIngredients[recipeId] = [target.value];
      } else {
        const ingredients = JSON.parse(storage)[recipeId];
        recipeIngredients[recipeId] = [...ingredients, target.value];
      }
    } else if (!target.checked && storage) {
      const ingredients = JSON.parse(storage)[recipeId];
      recipeIngredients[recipeId] = ingredients
        .filter((ingredient) => ingredient !== target.value);
    }

    localStorage.setItem(recipeType, JSON.stringify(recipeIngredients));
  };

  const renderIngredients = () => {
    const ingredientsKeyValue = Object.entries(recipe);
    const ingredients = ingredientsKeyValue
      .filter(([key, value]) => key.startsWith('strIngredient') && value?.length > 0)
      .map((ingredient) => ingredient[1]);

    const measurements = ingredientsKeyValue
      .filter(([key, value]) => key.startsWith('strMeasure') && value?.length > 0)
      .map((measure) => measure[1]);

    return ingredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <Input
          inputType="checkbox"
          inputValue={ ingredient }
          changed={ inputChangeHandler }
        />
        {ingredient}
        {' - '}
        {measurements[index]}
      </li>
    ));
  };

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
