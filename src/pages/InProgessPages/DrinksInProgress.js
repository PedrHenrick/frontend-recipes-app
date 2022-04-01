import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../../components/Recipes/RecipeInProgress';

function DrinksInProgress(props) {
  const { match: { params } } = props;

  return (
    <RecipeInProgress recipeId={ params.recipe_id } />
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipe_id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksInProgress;
