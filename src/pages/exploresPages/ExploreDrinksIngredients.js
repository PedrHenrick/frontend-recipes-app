import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { fetchMealsOrDrinksIngredients } from '../../services/api';

function ExploreDrinksIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getDrinksIngredients = async () => {
      const drinksIngredientsList = await fetchMealsOrDrinksIngredients('drinks');
      const numberDrinks = 12;
      setIngredientsList(drinksIngredientsList.drinks.slice(0, numberDrinks));
    };
    getDrinksIngredients();
  }, []);

  return (
    <>
      <Header
        title="Explore Ingredients"
        showSearch={ false }
      />
      { ingredientsList.map(({ strIngredient1 }, index) => (
        <Link to={ `/drinks/${strIngredient1}` } key={ strIngredient1 }>
          <div
            className="recipe__card"
            data-testid={ `${index}-ingredient-card` }
          >
            <h4
              className="recipe__name"
              data-testid={ `${index}-card-name` }
            >
              {strIngredient1}
            </h4>
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ `ingredient ${strIngredient1} img ${index}` }
              className="recipe__img"
              data-testid={ `${index}-card-img` }
              width="150px"
            />
          </div>
        </Link>
      )) }
      <BottomMenu />
    </>
  );
}

export default ExploreDrinksIngredients;
