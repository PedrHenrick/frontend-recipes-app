import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../../components/Recipes/RecipeInProgress';

function FoodsInProgress(props) {
  const { location: { pathname } } = props;
  return (
    <div className="recipe-background">
      <RecipeInProgress
        isMeal={ pathname.startsWith('/foods') }
      />
    </div>
  );
}

FoodsInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FoodsInProgress;
