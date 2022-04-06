import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../Forms/Button';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../../styles/recipes.css';
import IngredientsList from './IngredientsList';
import recipesContext from '../../context/recipesContext';
import { currentDate, removeFavoriteRecipeFromStorage,
  saveFavoriteRecipesInStorage } from '../../helpers/helpers';
import { getRecipeById } from '../../services/api';
import { addDoneRecipes } from '../../services/localStorage';

const THREE_SECONDS = 3000;
const CURRENT_PARAM = '/in-progress';

function RecipeInProgress(props) {
  const { isMeal, history: { push } } = props;
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
  const favoriteIconSrc = isFavorite ? blackHeartIcon : whiteHeartIcon;

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

    push('/done-recipes');
  };

  return (
    <section>
      { isLoaded && (
        <div className="recipe-progress__container">
          <img
            alt={ recipe[`str${recipeType}`] }
            className="recipe-progress__img"
            data-testid="recipe-photo"
            src={ recipe[`str${recipeType}Thumb`] }
          />
          <h2
            className="recipe-progress__heading"
            data-testid="recipe-title"
          >
            {recipe[`str${recipeType}`]}
          </h2>
          <div>
            {copiedText && <p>Link copied!</p>}
            <button type="button" onClick={ shareClickHandler }>
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt="icon share"
              />
            </button>
            <button
              type="button"
              onClick={ favoriteRecipeHandler }
            >
              <img
                data-testid="favorite-btn"
                src={ favoriteIconSrc }
                alt="icon favorite"
              />
            </button>
          </div>
          <h6
            className="recipe__category--title"
            data-testid="recipe-category"
          >
            {recipe.strCategory}
          </h6>
          <h3 className="recipe-progress__ingredients">Ingredients</h3>
          <IngredientsList recipe={ recipe } isMeal={ isMeal } recipeId={ recipeId } />
          <p
            className="recipe-progress__instructions"
            data-testid="instructions"
          >
            { recipe.strInstructions }
          </p>
          <Button
            btnName="Finish"
            dataTestid="finish-recipe-btn"
            isDisabled={ !disabled }
            clicked={ finishRecipeHandler }
          />
        </div>
      )}
    </section>
  );
}

RecipeInProgress.defaultProps = {
  isMeal: false,
};

RecipeInProgress.propTypes = {
  isMeal: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(RecipeInProgress);
