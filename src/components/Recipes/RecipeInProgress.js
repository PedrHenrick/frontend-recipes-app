import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../Forms/Button';
import Icon from '../Icon';
import IngredientsList from './IngredientsList';
import recipesContext from '../../context/recipesContext';
import { currentDate, getIngredientsAndMeasurements, removeFavoriteRecipeFromStorage,
  saveFavoriteRecipesInStorage } from '../../helpers/helpers';
import { getRecipeById } from '../../services/api';
import { addDoneRecipes } from '../../services/localStorage';
import '../../styles/recipes.css';
import Instructions from './Instructions';

const THREE_SECONDS = 3000;
const CURRENT_PARAM = '/in-progress';

function RecipeInProgress(props) {
  const { isMeal, history } = props;
  const recipeType = isMeal ? 'Meal' : 'Drink';
  const type = isMeal ? 'meals' : 'drinks';
  const recipeId = window.location.pathname
    .replace((isMeal ? '/foods/' : '/drinks/'), '')
    .replace(CURRENT_PARAM, '')
    .trim();

  const { ingredientsStatus: { disabled } } = useContext(recipesContext);

  const [copiedText, setCopiedText] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipe, setRecipe] = useState({});
  const favoriteIconSrc = isFavorite ? 'heart' : 'heart-o';

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');

    getRecipeById(type, recipeId).then((recipeResults) => {
      const matchedRecipe = recipeResults[type];
      setRecipe(matchedRecipe[0]);
      setIsLoaded(true);
    });

    if (storage && Object.keys(storage).length > 0) {
      const favorite = JSON.parse(storage).some(({ id }) => recipeId === id);
      setIsFavorite(favorite);
    }
  }, [recipeId, type, recipeType]);

  const favoriteRecipeHandler = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      removeFavoriteRecipeFromStorage(recipeId);
    } else {
      saveFavoriteRecipesInStorage(recipe, recipeType);
    }
  };

  const shareClickHandler = () => {
    const URL = window.location.href.replace(CURRENT_PARAM, '');
    navigator.clipboard.writeText(URL);
    setCopiedText(true);
    const interval = setInterval(() => {
      setCopiedText(false);
      clearInterval(interval);
    }, THREE_SECONDS);
  };

  const finishRecipeHandler = () => {
    addDoneRecipes({
      id: recipeId.toString(),
      type: type.split('s')[0],
      nationality: recipeType === 'Meal' ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe[`str${recipeType}`],
      image: recipe[`str${recipeType}Thumb`],
      doneDate: currentDate(),
      tags: recipe.strTags && recipe.strTags.split(','),
    });

    history.push('/done-recipes');
  };
  const [ingredients] = getIngredientsAndMeasurements(recipe);

  return (
    <section>
      { isLoaded && (
        <div className="recipe-progress__container">
          <Button
            btnClass="go-back__btn"
            clicked={ history.goBack }
          >
            <Icon iconClass="progress-menu__icon" iconName="undo2" />
          </Button>
          <div className="recipe-progress__heading">
            <h2
              className="recipe-progress__name"
              data-testid="recipe-title"
            >
              {recipe[`str${recipeType}`]}
            </h2>
            <div className="recipe-progress__details">
              <h4
                className="recipe-progress__category"
                data-testid="recipe-category"
              >
                {recipe.strCategory}
              </h4>
              <h6 className="recipe-progress__quantity">
                {ingredients.length }
                {' '}
                ingredients
              </h6>

            </div>
          </div>
          <img
            alt={ recipe[`str${recipeType}`] }
            className="recipe-progress__img"
            data-testid="recipe-photo"
            src={ recipe[`str${recipeType}Thumb`] }
          />
          <div className="recipe-progress__buttons">
            <div>
              <Button
                btnClass="progress-menu__btn"
                clicked={ shareClickHandler }
              >
                <Icon iconClass="progress-menu__icon" iconName="share2" />
              </Button>
              <Button
                btnClass="progress-menu__btn"
                clicked={ favoriteRecipeHandler }
              >
                <Icon iconClass="progress-menu__icon" iconName={ favoriteIconSrc } />
              </Button>
            </div>
            {copiedText && <p>Link copied!</p>}
          </div>
          <div className="recipe-progress__ingredients">
            <h3 className="recipe__heading">
              <span className="recipe__heading--title">{'Let\'s get started!'}</span>
              <span className="recipe__heading--message">
                But first we make sure we have all the ingredients
              </span>
            </h3>
            <IngredientsList recipe={ recipe } isMeal={ isMeal } recipeId={ recipeId } />
          </div>
          <div className="recipe-progress__instructions">
            <h3 className="recipe__heading">How to make it</h3>
            <Instructions instructionsStr={ recipe.strInstructions } />
          </div>
          <div className="recipe-progress__btn">
            <Button
              btnClass="finish-recipe__btn"
              dataTestid="finish-recipe-btn"
              isDisabled={ !disabled }
              clicked={ finishRecipeHandler }
            >
              Finish Recipe
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

RecipeInProgress.defaultProps = {
  isMeal: false,
  history: undefined,
};

RecipeInProgress.propTypes = {
  isMeal: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
};

export default withRouter(RecipeInProgress);
