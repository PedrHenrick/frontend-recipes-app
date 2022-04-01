import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// * A foto deve possuir o atributo `data-testid="recipe-photo"`; ✅
// * O título deve possuir o atributo `data-testid="recipe-title"`; ✅
// * O botão de compartilhar deve possuir o atributo `data-testid="share-btn"`;
// * O botão de favoritar deve possuir o atributo `data-testid="favorite-btn"`;
// * O texto da categoria deve possuir o atributo `data-testid="recipe-category"`; ✅
// * Os ingredientes devem possuir o atributo `data-testid="${index}-ingredient-name-and-measure"`; ✅
// * O texto de instruções deve possuir o atributo `data-testid="instructions"`;
// * O vídeo, presente somente na tela de comidas, deve possuir o atributo `data-testid="video"`;
// * O card de receitas recomendadas deve possuir o atributo `data-testid="${index}-recomendation-card"`;
// * O botão de iniciar receita deve possuir o atributo `data-testid="start-recipe-btn"`;

function DrinkDescription({ history }) {
  const id = (Number(history.location.pathname.split('/')[2]));
  const [drinkObject, setDrinkObject] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = await data.json();
      setDrinkObject(response.drinks[0]);
    };
    requestAPI();
  }, [id]);

  const arrayOfEntries = Object.entries(drinkObject);

  const ingredients = arrayOfEntries.filter((ingredient) => (
    ingredient[0].includes('strIngredient')
  ));

  const measures = arrayOfEntries.filter((measure) => (
    measure[0].includes('strMeasure')
  ));
  console.log(drinkObject);

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
