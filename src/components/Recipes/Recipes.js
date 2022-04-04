import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import recipesContext from '../../context/recipesContext';
import { fetchMealsOrDrinksByName } from '../../services/api';
import Recipe from './Recipe';
import Categories from '../Categories/Categories';
import '../../styles/recipe.css';

const MAX_RECIPES = 12;

function Recipes(props) {
  const { meal: { meals, setMeals },
    drink: { drinks, setDrinks } } = useContext(recipesContext);
  const { location: { pathname } } = props;

  useEffect(() => {
    if (pathname === '/foods') {
      fetchMealsOrDrinksByName('meals').then(({ meals: results }) => {
        const mealResults = results.filter((_element, index) => index < MAX_RECIPES);
        setMeals(mealResults);
      });
    } else if (pathname === '/drinks') {
      fetchMealsOrDrinksByName('drinks').then(({ drinks: results }) => {
        const drinkResults = results.filter((_element, index) => index < MAX_RECIPES);
        setDrinks(drinkResults);
      });
    }
  }, [pathname, setMeals, setDrinks]);

  useEffect(() => {
    if (meals.length > 1) {
      setMeals(meals);
    }
    if (drinks.length > 1) {
      setDrinks(drinks);
    }
  }, [setMeals, setDrinks, meals, drinks]);

  const renderRecipes = () => {
    if (pathname === '/foods') {
      return meals.map((meal, index) => (<Recipe
        key={ index }
        index={ index }
        recipeName={ meal.strMeal }
        recipeImgSrc={ meal.strMealThumb }
        recipeId={ meal.idMeal }
        recipeType={ pathname }
      />));
    }
    if (pathname === '/drinks') {
      return drinks.map((drink, index) => (<Recipe
        key={ index }
        index={ index }
        recipeName={ drink.strDrink }
        recipeImgSrc={ drink.strDrinkThumb }
        recipeId={ drink.idDrink }
        recipeType={ pathname }
      />));
    }
  };

  return (
    <div className="recipe-container">
      <Categories type={ pathname === '/foods' ? 'meals' : 'drinks' } />
      { renderRecipes() }
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Recipes);
