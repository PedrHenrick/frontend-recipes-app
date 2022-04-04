import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../Forms/CheckBox';
import '../../styles/recipes.css';
import { getIngredientsAndMeasurements,
  saveIngredientsInStorage } from '../../helpers/helpers';

function IngredientsList(props) {
  const { recipe, isMeal, recipeId } = props;
  const recipeType = isMeal ? 'meals' : 'cocktails';
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const [ingredients, measurements] = getIngredientsAndMeasurements(recipe);

  const checkIngredients = (ingredientsArray) => {
    const storage = localStorage.getItem(recipeType);
    if (storage) {
      const ingredientsInStorage = JSON.parse(storage)[recipeId] ?? [];
      return ingredientsArray.map((ing) => ({
        [ing]: ingredientsInStorage.some((item) => item === ing),
      }));
    }
    return ingredientsArray.map((ing) => ({
      [ing]: false,
    }));
  };

  const inputChangeHandler = ({ target }) => {
    saveIngredientsInStorage(target, recipeId, recipeType);
    const newIngredients = ingredientsChecked.map((item) => {
      const [ingredient] = Object.entries(item);

      if (ingredient[0] === target.value) {
        return { [ingredient[0]]: target.checked };
      }
      return { [ingredient[0]]: ingredient[1] };
    });
    setIngredientsChecked(newIngredients);
  };

  useEffect(() => {
    const ingredientsArray = checkIngredients(ingredients);
    setIngredientsChecked(ingredientsArray);
    console.log(ingredientsArray);
  }, [recipe]);

  const renderIngredients = () => ingredientsChecked
    .map((ingredientObj, index) => {
      const [ingredientEntry] = Object.entries(ingredientObj);

      return (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <CheckBox
            inputType="checkbox"
            inputValue={ ingredientEntry[0] }
            changed={ inputChangeHandler }
            isChecked={ ingredientEntry[1] }
          />
          {ingredientEntry[0]}
          {' - '}
          {measurements[index]}
        </li>
      );
    });

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
  recipeId: PropTypes.string.isRequired,
};

export default IngredientsList;
