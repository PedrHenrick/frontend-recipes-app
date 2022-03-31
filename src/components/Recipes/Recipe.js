import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Recipe(props) {
  const { index, recipeName, recipeImgSrc, recipeId, recipeType } = props;

  return (
    <Link to={ `${recipeType}/${recipeId}` }>
      <div className="recipe__card" data-testid={ `${index}-recipe-card` }>
        <h4
          className="recipe__name"
          data-testid={ `${index}-card-name` }
        >
          {recipeName}
        </h4>
        <img
          src={ recipeImgSrc }
          alt={ `recipe ${recipeName} img ${index}` }
          className="recipe__img"
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

Recipe.propTypes = {
  index: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  recipeImgSrc: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default Recipe;
