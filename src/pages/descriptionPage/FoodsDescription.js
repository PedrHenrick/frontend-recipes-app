import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FoodsDescription({ history }) {
  const id = (Number(history.location.pathname.split('/')[2]));
  const [foodsObject, setFoodsObject] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();
      setFoodsObject(response.meals[0]);
    };
    requestAPI();
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
      { foodsObject
        ? (
          <section>
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
