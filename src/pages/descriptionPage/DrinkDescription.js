import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';

function DrinkDescription({ history }) {
  const NUMBER_RECOMMENDED = 6;
  const id = (Number(history.location.pathname.split('/')[2]));
  const [drinkObject, setDrinkObject] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();
      setDrinkObject(response.drinks[0]);
    };
    requestAPI();
    const requestAPIRecommended = async () => {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const response = await data.json();
      setRecommended(response.drinks);
    };
    requestAPIRecommended();
  }, [id]);

  const arrayOfEntries = Object.entries(drinkObject);

  const ingredients = arrayOfEntries.filter((ingredient) => (
    ingredient[0].includes('strIngredient')
  ));

  const measures = arrayOfEntries.filter((measure) => (
    measure[0].includes('strMeasure')
  ));

  return (
    <main>
      { drinkObject
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
              { ingredients.filter((ingredientsTest) => ingredientsTest[1] !== null)
                .map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient[1]}
                    {': '}
                    { measures[index][1] === null
                      ? null
                      : measures[index][1] }
                  </li>
                ))}
            </ul>
            <p data-testid="instructions">
              { drinkObject.strInstructions }
            </p>
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
                      width="100px"
                    />
                    <h3
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { recommend[1].strDrink }
                    </h3>
                  </li>
                )) }
            </ul>
            <button
              className="describeButtonStart"
              type="button"
              data-testid="start-recipe-btn"
            >
              Start recipe
            </button>
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
