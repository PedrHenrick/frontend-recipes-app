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
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FoodsDescription({ history }) {
  const NUMBER_RECOMMENDED = 6;
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
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();

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
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const response = await data.json();
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

  function copyClipboard() {
    const copyText = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(copyText);

    setLinkCopied(true);
    const interval = setInterval(() => {
      setLinkCopied(false);
      clearInterval(interval);
    }, TIMER_CLOCK);
  }

  function setFavorites() {
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
  }

  console.log(verifyDoneRecipes);
  return (
    <main>
      { foodsObject.length !== 0
        ? (
          <section className="sectionDescribe">
            {/* Imagem da comida */}
            <img
              data-testid="recipe-photo"
              src={ foodsObject.strMealThumb }
              alt={ `Imagem da comida ${foodsObject.strMeal}` }
              width="100px"
            />
            {/* Nome da comida */}
            <h1
              data-testid="recipe-title"
            >
              { foodsObject.strMeal }
            </h1>
            {/* Categoria da comida */}
            <h2
              data-testid="recipe-category"
            >
              { foodsObject.strCategory }
            </h2>
            {/* Lista de ingredientes e quantidades */}
            <ul>
              { ingredientArr.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  className="ingredientsList"
                >
                  {ingredient[0]}
                  {': '}
                  { ingredient[1] }
                </li>
              ))}
            </ul>
            {/* Intruções de preparação */}
            <p data-testid="instructions" className="instructions">
              { foodsObject.strInstructions }
            </p>
            {/* Botões de compatilhamento e de favoritar */}
            <div className="divButtons">
              <div className="divButtonShare">
                {/* mensagem de compartilhamento */}
                { linkCopied
                  ? <p className="linkMessage">Link copied!</p>
                  : <p className="linkMessage">Copy the link!</p> }
                {/* botão de compatilhar */}
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ copyClipboard }
                >
                  <img
                    src={ shareIcon }
                    alt="icone de compartilhamento"
                  />
                </button>
              </div>
              {/* botão de favoritar */}
              <button
                type="button"
                onClick={ setFavorites }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  alt="Icone de favorito"
                />
              </button>
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
            <ul className="recommendedList">
              { Object.entries(recommended).slice(0, NUMBER_RECOMMENDED)
                .map((recommend, index) => (
                  <li
                    key={ recommend[1].idDrink }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      src={ recommend[1].strDrinkThumb }
                      alt={ `Imagem da comida ${recommend[1].strDrink}` }
                      width="200px"
                    />
                    <h3
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { recommend[1].strDrink }
                    </h3>
                  </li>
                )) }
            </ul>
            {/* botão de começar/continuar uma receita */}
            { !verifyDoneRecipes && (
              <button
                className="describeButtonStart"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => {
                  addInProgressMeals({
                    [id]: ingredientArr,
                  });
                  history.push(`${history.location.pathname}/in-progress`);
                } }
              >
                {verifyInProgress ? 'Continue' : 'Start'}
                {' '}
                Recipe
              </button>
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
