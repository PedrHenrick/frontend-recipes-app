import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';
import {
  getDoneRecipes,
  getfavorites,
  removeFavorites,
  addInFavorites,
  getInProgress,
  addInProgressDrinks,
} from '../../services/localStorage';
import { getRecipeById, getRecipeRecommendeds } from '../../services/api';
import { addMeasurementConnective } from '../../helpers/helpers';
import Button from '../../components/Forms/Button';
import Icon from '../../components/Icon';
import Recommended from '../../components/Recipes/Recommended';

function DrinkDescription({ history }) {
  const TIMER_CLOCK = 3000;

  const id = (Number(history.location.pathname.split('/')[2]));
  const [drinkObject, setDrinkObject] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verifyDoneRecipes, setVerifyDoneRecipes] = useState(false);
  const [ingredientArr, setIngredient] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await getRecipeById('drinks', id);

      const arrayOfEntries = Object.entries(response.drinks[0]);
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

      setIngredient(createIngredientsMeasure);
      setDrinkObject(response.drinks[0]);
    };
    requestAPI();
    const requestAPIRecommended = async () => {
      const response = await getRecipeRecommendeds('meals');
      setRecommended(response.meals);
    };
    requestAPIRecommended();
    const verifyLocalStorage = () => {
      const favoritesInlocalStorage = getfavorites();
      const inProgressLocalStorage = getInProgress();
      const donRecipesInlocalStorage = getDoneRecipes();

      setFavorite(favoritesInlocalStorage.some((idFav) => Number(idFav.id) === id));
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
        type: 'drink',
        nationality: '',
        category: drinkObject.strCategory,
        alcoholicOrNot: drinkObject.strAlcoholic,
        name: drinkObject.strDrink,
        image: drinkObject.strDrinkThumb,
      });
    }
  };

  const btnName = verifyInProgress ? 'Continue Recipe' : 'Start Recipe';

  return (
    <main>
      { drinkObject.length !== 0
        ? (
          <section className="recipe-description">
            <Button
              btnClass="go-back__btn"
              clicked={ history.goBack }
            >
              <Icon iconClass="menu__icon" iconName="undo2" />
            </Button>
            {/* Imagem da comida */}
            <img
              className="recipe-description__img"
              data-testid="recipe-photo"
              src={ drinkObject.strDrinkThumb }
              alt={ `Imagem da bebida ${drinkObject.strDrink}` }
              width="100px"
            />
            {/* Nome da comida */}
            <div className="recipe-description__heading">
              <h2 data-testid="recipe-title" className="recipe-description__name">
                { drinkObject.strDrink }
              </h2>
              {/* Categoria da comida */}
              <h3 data-testid="recipe-category" className="recipe-description__category">
                { drinkObject.strAlcoholic }
              </h3>
            </div>

            {/* Lista de ingredientes e quantidades */}
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
                      { ingredient[1]
                      && `${ingredient[1]} ${addMeasurementConnective(ingredient[0])} `}
                    </span>
                    <span className="ingredient__name">
                      { ingredient[0] }
                    </span>
                    {' '}
                  </li>
                ))}
              </ul>
            </div>
            {/* Intruções de preparação */}
            <div className="recipe-description__instructions">
              <h2 className="ingredient-title">Instructions</h2>
              <p className="ingredient__instructions">
                {drinkObject.strInstructions}
              </p>
            </div>

            {/* Botões de compatilhamento e de favoritar */}
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
            {/* lista de itens recomendados */}
            <Recommended recommended={ recommended } type="meals" />
            {/* botão de começar/continuar uma receita */}
            { !verifyDoneRecipes && (
              <Button
                btnClass="start-recipe__btn"
                dataTestid="start-recipe-btn"
                clicked={ () => {
                  addInProgressDrinks({
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

export default DrinkDescription;

DrinkDescription.defaultProps = {
  history: {},
};

DrinkDescription.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
