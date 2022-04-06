import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Forms/Button';
import { redirectToRandomRecipe, setExploreRecipeUrl } from '../../helpers/helpers';

function ExploreRecipes(props) {
  const { isMeal, history: { push } } = props;

  const exploreByParamHandler = async ({ target }) => {
    try {
      const path = window.location.pathname;
      const param = setExploreRecipeUrl(target.innerText);

      if (param) {
        push(path + param);
      } else if (target.innerText === 'Surprise me!') {
        const randomRecipe = await redirectToRandomRecipe(isMeal);
        push(randomRecipe);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Button
        dataTestid="explore-by-ingredient"
        clicked={ exploreByParamHandler }
      >
        By Ingredient
      </Button>
      {isMeal && (
        <Button
          dataTestid="explore-by-nationality"
          clicked={ exploreByParamHandler }
        >
          By Nationality
        </Button>
      )}
      <Button
        dataTestid="explore-surprise"
        clicked={ exploreByParamHandler }
      >
        Surprise me!
      </Button>
    </div>
  );
}

ExploreRecipes.defaultProps = {
  isMeal: false,
};

ExploreRecipes.propTypes = {
  isMeal: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(ExploreRecipes);
