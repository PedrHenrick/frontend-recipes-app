import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../../context/recipesContext';
import Recipe from './Recipe';

function Recipes() {
  const { meal: { meals }, drink: { drinks } } = useContext(recipesContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (meals.length > 1 || drinks.length > 1) {
      setIsLoaded(true);
    }
  }, [meals, drinks]);

  const renderRecipes = () => {
    if (meals.length > 1) {
      return meals.map((meal, index) => (<Recipe
        key={ meal.idMeal }
        index={ index }
        recipeName={ meal.strMeal }
        recipeImgScr={ meal.strMealThumb }
      />));
    }
    if (drinks.length > 1) {
      return drinks.map((drink, index) => (<Recipe
        key={ drink.idDrink }
        index={ index }
        recipeName={ drink.strDrink }
        recipeImgScr={ drink.strDrinkThumb }
      />));
    }
  };

  return (
    <div className="recipe-container">
      { isLoaded && renderRecipes() }
    </div>
  );
}

export default Recipes;
