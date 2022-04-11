import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Ingredient(props) {
  const { dataTestid, index, ingredientImgSrc, ingredientPath, strIngredient } = props;
  return (
    <Link to={ ingredientPath } className="recipe__link">
      <div
        className="recipe__card"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ ingredientImgSrc }
          alt={ `ingredient ${strIngredient} img ${index}` }
          className="recipe__img ingredient"
          data-testid={ `${index}-card-img` }
        />
        <h4
          className="recipe__name"
          data-testid={ dataTestid }
        >
          {strIngredient}
        </h4>
      </div>
    </Link>
  );
}

Ingredient.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredientImgSrc: PropTypes.string.isRequired,
  ingredientPath: PropTypes.string.isRequired,
  strIngredient: PropTypes.string.isRequired,
};

export default Ingredient;
