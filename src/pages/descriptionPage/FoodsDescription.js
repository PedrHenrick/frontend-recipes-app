import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';
import {
  getDoneRecipes,
  getfavorites,
  removeFavorites,
  addInFavorites,
  getInProgress,
  addInProgressMeals,
} from '../../services/localStorage';
import { getRecipeById, getRecipeRecommendeds } from '../../services/api';
import { setCountryFlag } from '../../helpers/helpers';
import Button from '../../components/Forms/Button';
import Icon from '../../components/Icon';
import Recommended from '../../components/Recipes/Recommended';

function FoodsDescription({ history }) {
  const TIMER_CLOCK = 3000;

  const id = Number(history.location.pathname.split('/')[2]);
  const [foodsObject, setFoodsObject] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verifyDoneRecipes, setVerifyDoneRecipes] = useState(false);
  const [ingredientArr, setIngredient] = useState([]);
  const [urlLink, setUrlLink] = useState(' ');
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const requestAPIFoods = async () => {
      const response = await getRecipeById('meals', id);

      const arrayOfEntries = Object.entries(response.meals[0]);
      const measures = arrayOfEntries.filter((measure) => (
        measure[0].includes('strMeasure')
      )).filter((measureTest) => (
        measureTest[1] !== null && measureTest[1] !== ''
      )).map((measuress) => measuress[1]);
      const ingredients = arrayOfEntries.filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      )).filter((ingredientsTest) => (
        ingredientsTest[1] !== null && ingredientsTest[1] !== ''
      )).map((ingredient) => ingredient[1]);
      const createIngredientsMeasure = ingredients.map((ingredient, index) => (
        [ingredient, measures[index]]
      ));

      const linkOfVideo = String(response.meals[0].strYoutube).split('=');

      setUrlLink(`https://www.youtube.com/embed/${linkOfVideo[1]}`);
      setIngredient(createIngredientsMeasure);
      setFoodsObject(response.meals[0]);
    };
    requestAPIFoods();
    const requestAPIRecommended = async () => {
      const response = await getRecipeRecommendeds('drinks');
      setRecommended(response.drinks);
    };
    requestAPIRecommended();
    const verifyLocalStorage = () => {
      const favoritesInlocalStorage = getfavorites();
      const inProgressLocalStorage = getInProgress();
      const donRecipesInlocalStorage = getDoneRecipes();

      setFavorite(favoritesInlocalStorage
        .some((idFav) => Number(idFav.id) === id));
      setVerifyInProgress(Object.values(inProgressLocalStorage)
        .some((idFoods) => Number(Object.keys(idFoods)[0]) === id));
      setVerifyDoneRecipes(donRecipesInlocalStorage
        .some((idDone) => Number(idDone.id) === id));
    };
    verifyLocalStorage();
  }, [id]);

  const copyClipboard = () => {
    const copyText = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(copyText);

    setLinkCopied(true);
    const interval = setInterval(() => {
      setLinkCopied(false);
      clearInterval(interval);
    }, TIMER_CLOCK);
  };

  const setFavorites = () => {
    setFavorite(!favorite);

    if (!favorite === false) {
      removeFavorites(id);
    } else {
      addInFavorites({
        id: id.toString(),
        type: 'food',
        nationality: foodsObject.strArea,
        category: foodsObject.strCategory,
        alcoholicOrNot: '',
        name: foodsObject.strMeal,
        image: foodsObject.strMealThumb,
      });
    }
  };

  const btnName = verifyInProgress ? 'Continue Recipe' : 'Start Recipe';

  return (
    <main>
      { foodsObject.length !== 0
        ? (
          <section className="recipe-description">
            <img
              className="recipe-description__img"
              data-testid="recipe-photo"
              src={ foodsObject.strMealThumb }
              alt={ `Imagem da comida ${foodsObject.strMeal}` }
            />
            <div className="recipe-description__heading">
              <h2
                data-testid="recipe-title"
                className="recipe-description__name"
              >
                { foodsObject.strMeal }
              </h2>
              <div className="recipe-description__details">
                <h3
                  className="recipe-description__category"
                  data-testid="recipe-category"
                >
                  { foodsObject.strCategory }
                </h3>
                <h4 className="nacionality__heading">
                  <img
                    className="nacionality__img"
                    src={ setCountryFlag(foodsObject.strArea) }
                    alt={ `${foodsObject.strArea} flag` }
                  />
                  {foodsObject.strArea}
                </h4>
              </div>
            </div>
            <div className="recipe-description__ingredients">
              <h2 className="ingredient-title">Ingrendients</h2>
              <ul className="ingredients__list">
                { ingredientArr.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    className="ingredients__item"
                  >
                    <span className="ingredient__measurement">
                      {`${ingredient[1]} of `}
                    </span>
                    <span className="ingredient__name">
                      { ingredient[0] }
                    </span>
                    {' '}
                  </li>
                ))}
              </ul>
            </div>
            <div className="recipe-description__instructions">
              <h2 className="ingredient-title">Instructions</h2>
              <p className="ingredient__instructions">
                {foodsObject.strInstructions}
              </p>
            </div>
            <div className="recipe-description__buttons">
              <div className="divButtonShare">
                <Button
                  btnClass="menu__btn"
                  data-testid="share-btn"
                  clicked={ copyClipboard }
                >
                  <Icon iconClass="menu__icon" iconName="share2" />
                </Button>
                <Button
                  btnClass="menu__btn"
                  clicked={ setFavorites }
                >
                  <Icon
                    iconClass="menu__icon"
                    iconName={ favorite ? 'heart' : 'heart-o' }
                  />
                </Button>
              </div>
              { linkCopied && <p className="linkMessage">Copy the link!</p> }
            </div>
            {/* vídeo da receita */}
            <iframe
              title={ `vídeo ${foodsObject.strMeal}` }
              width="360"
              height="250"
              data-testid="video"
              src={ urlLink }
            >
              { null }
            </iframe>
            {/* lista de itens recomendados */}
            <Recommended recommended={ recommended } />
            { !verifyDoneRecipes && (
              <Button
                btnClass="start-recipe__btn"
                dataTestid="start-recipe-btn"
                clicked={ () => {
                  addInProgressMeals({
                    [id]: ingredientArr,
                  });
                  history.push(`${history.location.pathname}/in-progress`);
                } }
              >
                {btnName}
              </Button>
            )}
          </section>
        ) : null}
    </main>
  );
}

export default FoodsDescription;

FoodsDescription.defaultProps = {
  history: {},
};

FoodsDescription.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
