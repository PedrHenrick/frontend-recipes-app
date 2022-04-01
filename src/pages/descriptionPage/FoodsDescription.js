import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/describe.css';

function FoodsDescription({ history }) {
  const NUMBER_RECOMMENDED = 6;
  const id = (Number(history.location.pathname.split('/')[2]));
  const [foodsObject, setFoodsObject] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const requestAPIFoods = async () => {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();
      setFoodsObject(response.meals[0]);
    };
    requestAPIFoods();
    const requestAPIRecommended = async () => {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const response = await data.json();
      setRecommended(response.meals);
    };
    requestAPIRecommended();
  }, [id]);

  const arrayOfEntries = Object.entries(foodsObject);

  const ingredients = arrayOfEntries.filter((ingredient) => (
    ingredient[0].includes('strIngredient')
  ));

  const measures = arrayOfEntries.filter((measure) => (
    measure[0].includes('strMeasure')
  ));

  const linkOfVideo = String(foodsObject.strYoutube).split('=');
  const Url = `https://www.youtube.com/embed/${linkOfVideo[1]}`;

  return (
    <main>
      { foodsObject && (
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
            { ingredients.filter((ingredientsTest) => (
              ingredientsTest[1] !== null && ingredientsTest[1] !== ''
            )).map((ingredient, index) => (
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
            { foodsObject.strInstructions }
          </p>

          <iframe
            title={ `vídeo ${measures.strMeal}` }
            width="360"
            height="250"
            data-testid="video"
            src={ Url }
          >
            { null }
          </iframe>
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
                    width="100px"
                  />
                  <h3
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recommend[1].strMeal }
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
      )}
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
