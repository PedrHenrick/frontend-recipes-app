import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Forms/Button';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchMealsOrDrinksByName } from '../../services/api';
import '../../styles/recipes.css';
import IngredientsList from './IngredientsList';

const INITIAL_STATE_MEAL = {
  idMeal: '52963',
  strMeal: 'Shakshuka',
  strDrinkAlternate: null,
  strCategory: 'Vegetarian',
  strArea: 'Egyptian',
  strInstructions: `Heat the oil in a frying pan that has a lid, 
  then soften the onions, chilli, garlic and coriander stalks 
  for 5 mins until soft. Stir in the tomatoes and sugar, 
  then bubble for 8-10 mins until thick. 
  Can be frozen for 1 month.\r\n\r\nUsing the back of a large spoon,
  make 4 dips in the sauce, then crack an egg into each one. 
  Put a lid on the pan, then cook over a low heat for 6-8 mins,
  until the eggs are done to your liking. 
  Scatter with the coriander leaves and serve with crusty bread.`,
  strMealThumb: 'https://www.themealdb.com/images/media/meals/g373701551450225.jpg',
  strTags: 'Egg,Brunch,Breakfast',
  strYoutube: 'https://www.youtube.com/watch?v=C-3_jYrfdBU',
  strIngredient1: 'Olive Oil',
  strIngredient2: 'Red Onions',
  strIngredient3: 'Red Chilli',
  strIngredient4: 'Garlic',
  strIngredient5: 'Coriander',
  strIngredient6: 'Cherry Tomatoes',
  strIngredient7: 'Caster Sugar',
  strIngredient8: 'Eggs',
  strIngredient9: '',
  strIngredient10: '',
  strIngredient11: '',
  strIngredient12: '',
  strIngredient13: '',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strMeasure1: '1 tbs',
  strMeasure2: '2 chopped',
  strMeasure3: '1 finely chopped ',
  strMeasure4: '1 clove',
  strMeasure5: 'Chopped',
  strMeasure6: '800g',
  strMeasure7: '1 tbs',
  strMeasure8: '4',
  strMeasure9: '',
  strMeasure10: ' ',
  strMeasure11: ' ',
  strMeasure12: ' ',
  strMeasure13: ' ',
  strMeasure14: ' ',
  strMeasure15: ' ',
  strMeasure16: ' ',
  strMeasure17: ' ',
  strMeasure18: ' ',
  strMeasure19: ' ',
  strMeasure20: ' ',
  strSource: 'https://www.bbcgoodfood.com/recipes/7573/spicy-tomato-baked-eggs',
  dateModified: null,
};

const INITIAL_STATE_DRINK = {
  idDrink: '17222',
  strDrink: 'A1',
  strDrinkAlternate: null,
  strDrinkES: null,
  strDrinkDE: null,
  strDrinkFR: null,
  'strDrinkZH-HANS': null,
  'strDrinkZH-HANT': null,
  strTags: null,
  strVideo: null,
  strCategory: 'Cocktail',
  strIBA: null,
  strAlcoholic: 'Alcoholic',
  strGlass: 'Cocktail glass',
  strInstructions: `Pour all ingredients into a cocktail shaker,
   mix and serve over ice into a chilled glass.`,
  strInstructionsES: null,
  strInstructionsDE: `Alle Zutaten in einen Cocktailshaker geben, 
  mischen und über Eis in ein gekühltes Glas servieren.`,
  strInstructionsFR: null,
  'strInstructionsZH-HANS': null,
  'strInstructionsZH-HANT': null,
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  strIngredient1: 'Gin',
  strIngredient2: 'Grand Marnier',
  strIngredient3: 'Lemon Juice',
  strIngredient4: '',
  strIngredient5: null,
  strIngredient6: null,
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strMeasure1: '1 3/4 shot ',
  strMeasure2: '1 Shot ',
  strMeasure3: '1/4 Shot',
  strMeasure4: '',
  strMeasure5: null,
  strMeasure6: null,
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
  strCreativeCommonsConfirmed: 'No',
  dateModified: '2017-09-07 21:42:09',
};

function RecipeInProgress(props) {
  const { isMeal, recipeId } = props;
  const recipeType = isMeal ? 'Meal' : 'Drink';
  const [recipe, setRecipe] = useState(isMeal ? INITIAL_STATE_MEAL : INITIAL_STATE_DRINK);

  useEffect(() => {
    const type = isMeal ? 'meals' : 'drinks';
    fetchMealsOrDrinksByName(type).then((recipeResult) => {
      const matchedRecipe = recipeResult[type]
        .find((rec) => rec[`id${recipeType}`] === recipeId);
      if (matchedRecipe !== undefined) {
        setRecipe(matchedRecipe);
      }
    });
  }, []);

  return (
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
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="icon share" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="icon favorite" />
        </button>
      </div>
      <h6
        className="recipe__category--title"
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </h6>
      <h3 className="recipe-progress__ingredients">Ingredients</h3>
      <IngredientsList recipe={ recipe } isMeal={ isMeal } />
      <p
        className="recipe-progress__instructions"
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
      <Button btnName="Finish" dataTestid="finish-recipe-btn" isDisabled />
    </div>
  );
}

RecipeInProgress.defaultProps = {
  isMeal: false,
};

RecipeInProgress.propTypes = {
  isMeal: PropTypes.bool,
  recipeId: PropTypes.string.isRequired,
};

export default RecipeInProgress;
