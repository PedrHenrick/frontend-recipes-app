import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';
import { doneRecipes, inProgressMeals } from '../../services/localStorage';

function FoodsDescription({ history }) {
  const NUMBER_RECOMMENDED = 6;
  const id = Number(history.location.pathname.split('/')[2]);

  const [foodsObject, setFoodsObject] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verifyDoneRecipes, setVerifyDoneRecipes] = useState(false);
  const [ingredientArr, setIngredient] = useState([]);
  const [measureArr, setMeasure] = useState([]);
  const [urlLink, setUrlLink] = useState(' ');

  useEffect(() => {
    const requestAPIFoods = async () => {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();

      const arrayOfEntries = Object.entries(response.meals[0]);

      const measures = arrayOfEntries.filter((measure) => (
        measure[0].includes('strMeasure')
      ));
      const ingredients = arrayOfEntries.filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ));

      const linkOfVideo = String(response.meals[0].strYoutube).split('=');

      setUrlLink(`https://www.youtube.com/embed/${linkOfVideo[1]}`);
      setIngredient(ingredients);
      setMeasure(measures);
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
      setVerifyInProgress(inProgressMeals(id));
      setVerifyDoneRecipes(doneRecipes(id));
    };
    verifyLocalStorage();
  }, [id]);

  return (
    <main>
      { foodsObject.length !== 0
        ? (
          <section className="sectionDescribe">
            <img
              data-testid="recipe-photo"
              src={ foodsObject.strMealThumb }
              alt={ `Imagem da comida ${foodsObject.strMeal}` }
              width="100px"
            />
            <h1
              data-testid="recipe-title"
            >
              { foodsObject.strMeal }
            </h1>
            <h2
              data-testid="recipe-category"
            >
              { foodsObject.strCategory }
            </h2>
            <ul>
              { ingredientArr.filter((ingredientsTest) => (
                ingredientsTest[1] !== null && ingredientsTest[1] !== ''
              )).map((ingredient, index) => (
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
              { foodsObject.strInstructions }
            </p>

            <iframe
              title={ `vídeo ${measureArr.strMeal}` }
              width="360"
              height="250"
              data-testid="video"
              src={ urlLink }
            >
              { null }
            </iframe>
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
                      width="180px"
                    />
                    <h3
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { recommend[1].strDrink }
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

export default FoodsDescription;

FoodsDescription.defaultProps = {
  history: {},
};

FoodsDescription.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
