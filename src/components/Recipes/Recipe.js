import React from 'react';
import PropTypes from 'prop-types';

function Recipe(props) {
  const { index, recipeName, recipeImgScr } = props;

  return (
    <div className="recipe-container" data-testid={ `${index}-recipe-card` }>
      <h4 className="recipe__name" data-testid={ `${index}-card-name` }>{recipeName}</h4>
      <img
        src={ recipeImgScr }
        alt={ `recipe ${recipeName} img ${index}` }
        className="recipe__img"
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

Recipe.propTypes = {
  index: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeImgScr: PropTypes.string.isRequired,
};

export default Recipe;
