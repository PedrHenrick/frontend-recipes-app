import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { fetchMealsOrDrinksIngredients } from '../../services/api';

function ExploreFoodsIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getFoodsIngredients = async () => {
      const foodsIngredientsList = await fetchMealsOrDrinksIngredients('meals');
      const numberMeals = 12;
      setIngredientsList(foodsIngredientsList.meals.slice(0, numberMeals));
    };
    getFoodsIngredients();
  }, []);
  console.log(ingredientsList);

  return (
    <>
      <Header
        title="Explore Ingredients"
        showSearch={ false }
      />
      { ingredientsList.map(({ strIngredient }, index) => (
        // site sobre paginas dinamicas usando Link >> https://learnwithparam.com/blog/dynamic-pages-in-react-router/
        <Link to={ `/foods/${strIngredient}` } key={ strIngredient }>
          <div
            className="recipe__card"
            data-testid={ `${index}-ingredient-card` }
          >
            <h4
              className="recipe__name"
              data-testid={ `${index}-card-name` }
            >
              {strIngredient}
            </h4>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ `ingredient ${strIngredient} img ${index}` }
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

export default ExploreFoodsIngredients;
