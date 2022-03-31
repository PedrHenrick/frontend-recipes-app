import React from 'react';
import PropTypes from 'prop-types';

function Recipe(props) {
  const { index, recipeName, recipeImgSrc } = props;

  return (
    <div className="recipe__card" data-testid={ `${index}-recipe-card` }>
      <h4 className="recipe__name" data-testid={ `${index}-card-name` }>{recipeName}</h4>
      <img
        src={ recipeImgSrc }
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
  recipeImgSrc: PropTypes.string.isRequired,
};

export default Recipe;
