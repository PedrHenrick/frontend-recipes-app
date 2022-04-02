import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';
import { doneRecipes, inProgressDrinks } from '../../services/localStorage';

function DrinkDescription({ history }) {
  const NUMBER_RECOMMENDED = 6;
  const id = (Number(history.location.pathname.split('/')[2]));
  const [drinkObject, setDrinkObject] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verifyDoneRecipes, setVerifyDoneRecipes] = useState(false);
  const [ingredientArr, setIngredient] = useState(false);
  const [measureArr, setMeasure] = useState(false);

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

  return (
    <main>
      { drinkObject.length !== 0
        ? (
          <section>
            <img
              data-testid="recipe-photo"
              src={ drinkObject.strDrinkThumb }
              alt={ `Imagem da bebida ${drinkObject.strDrink}` }
              width="100px"
            />
            <h1
              data-testid="recipe-title"
            >
              { drinkObject.strDrink }
            </h1>
            <h2
              data-testid="recipe-category"
            >
              { drinkObject.strAlcoholic }
            </h2>
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
            <p data-testid="instructions">
              { drinkObject.strInstructions }
            </p>
            <button type="button" data-testid="share-btn">share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
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
