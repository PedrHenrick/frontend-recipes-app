import React, { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import Ingredient from '../../components/Recipes/Ingredient';
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
    <div className="explore-container">
      <Header
        title="Explore Ingredients"
        showSearch={ false }
      />
      <div className="recipes ingredients">
        { ingredientsList.map(({ strIngredient }, index) => (
        // site sobre paginas dinamicas usando Link >> https://learnwithparam.com/blog/dynamic-pages-in-react-router/
          <Ingredient
            dataTestid={ `${index}-card-img` }
            key={ strIngredient }
            index={ index }
            ingredientImgSrc={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            ingredientPath={ `/foods/${strIngredient}` }
            strIngredient={ strIngredient }
          />
        )) }
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreFoodsIngredients;
