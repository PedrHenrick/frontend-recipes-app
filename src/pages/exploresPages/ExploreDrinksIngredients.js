import React, { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import Ingredient from '../../components/Recipes/Ingredient';
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
    <div className="explore-container">
      <Header
        title="Explore Ingredients"
        showSearch={ false }
      />
      <div className="recipes ingredients">
        { ingredientsList.map(({ strIngredient1 }, index) => (
        // site sobre paginas dinamicas usando Link >> https://learnwithparam.com/blog/dynamic-pages-in-react-router/
          <Ingredient
            dataTestid={ `${index}-card-img` }
            key={ strIngredient1 }
            index={ index }
            ingredientImgSrc={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            ingredientPath={ `/drinks/${strIngredient1}` }
            strIngredient={ strIngredient1 }
          />
        )) }
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreDrinksIngredients;
