import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Forms/Button';
import { redirectToRandomRecipe, setExploreRecipeUrl } from '../../helpers/helpers';
import Icon from '../Icon';

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
        btnClass="menu__btn"
        dataTestid="explore-by-ingredient"
        clicked={ exploreByParamHandler }
      >
        <Icon iconClass="menu__icon" iconName="spoon-knife" />
        <span>By Ingredient</span>
      </Button>
      {isMeal && (
        <Button
          btnClass="menu__btn"
          dataTestid="explore-by-nationality"
          clicked={ exploreByParamHandler }
        >
          <Icon iconClass="menu__icon" iconName="location" />
          <span>By Nationality</span>
        </Button>
      )}
      <Button
        btnClass="menu__btn"
        dataTestid="explore-surprise"
        clicked={ exploreByParamHandler }
      >
        <Icon iconClass="menu__icon" iconName="gift" />
        <span>Surprise me!</span>
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
