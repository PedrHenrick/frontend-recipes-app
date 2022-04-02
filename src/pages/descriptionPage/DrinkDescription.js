import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';
import { doneRecipes, inProgressDrinks } from '../../services/localStorage';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinkDescription({ history }) {
  const NUMBER_RECOMMENDED = 6;
  const TIMER_CLOCK = 3000;

  const id = (Number(history.location.pathname.split('/')[2]));
  const [drinkObject, setDrinkObject] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verifyDoneRecipes, setVerifyDoneRecipes] = useState(false);
  const [ingredientArr, setIngredient] = useState([]);
  const [measureArr, setMeasure] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();

      const arrayOfEntries = Object.entries(response.drinks[0]);

      const measures = arrayOfEntries.filter((measure) => (
        measure[0].includes('strMeasure')
      ));
      const ingredients = arrayOfEntries.filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ));

      setIngredient(ingredients);
      setMeasure(measures);
      setDrinkObject(response.drinks[0]);
    };
    requestAPI();
    const requestAPIRecommended = async () => {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const response = await data.json();
      setRecommended(response.meals);
    };
    requestAPIRecommended();
    const verifyLocalStorage = () => {
      setVerifyInProgress(inProgressDrinks(id));
      setVerifyDoneRecipes(doneRecipes(id));
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

  function addFavorites() {
    setFavorite(!favorite);
  }
  return (
    <main>
      { drinkObject.length !== 0
        ? (
          <section>
            {/* Imagem da comida */}
            <img
              data-testid="recipe-photo"
              src={ drinkObject.strDrinkThumb }
              alt={ `Imagem da bebida ${drinkObject.strDrink}` }
              width="100px"
            />
            {/* Nome da comida */}
            <h1 data-testid="recipe-title">
              { drinkObject.strDrink }
            </h1>
            {/* Categoria da comida */}
            <h2 data-testid="recipe-category">
              { drinkObject.strAlcoholic }
            </h2>
            {/* Lista de ingredientes e quantidades */}
            <ul>
              { ingredientArr.filter((ingredientsTest) => ingredientsTest[1] !== null)
                .map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient[1]}
                    {': '}
                    { measureArr[index][1] === null
                      ? null
                      : measureArr[index][1] }
                  </li>
                ))}
            </ul>
            {/* Intruções de preparação */}
            <p data-testid="instructions" className="instructions">
              { drinkObject.strInstructions }
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
                data-testid="favorite-btn"
                onClick={ addFavorites }
              >
                { favorite ? (
                  <img
                    src={ blackHeartIcon }
                    alt="Icone de favorito marcado"
                  />
                ) : (
                  <img
                    src={ whiteHeartIcon }
                    alt="Icone de favorito desmarcado"
                  />
                ) }
              </button>
            </div>
            {/* lista de itens recomendados */}
            <ul className="recommendedList">
              { Object.entries(recommended).slice(0, NUMBER_RECOMMENDED)
                .map((recommend, index) => (
                  <li
                    key={ recommend[1].idMeal }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      src={ recommend[1].strMealThumb }
                      alt={ `Imagem da comida ${recommend[1].strMeal}` }
                      width="180px"
                    />
                    <h3
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { recommend[1].strMeal }
                    </h3>
                  </li>
                )) }
            </ul>
            {/* botão de começar/continuar uma receita */}
            { verifyDoneRecipes && (
              <button
                className="describeButtonStart"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
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

export default DrinkDescription;

DrinkDescription.defaultProps = {
  history: {},
};

DrinkDescription.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
