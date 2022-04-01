import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../../components/Recipes/RecipeInProgress';

function FoodsInProgress(props) {
  const { location: { pathname }, match: { params } } = props;
  return (
    <div>
      <RecipeInProgress
        isMeal={ pathname.startsWith('/foods') }
        recipeId={ params.recipe_id }
      />
    </div>
  );
}

FoodsInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipe_id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsInProgress;
