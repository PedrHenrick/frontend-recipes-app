import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import recipesContext from '../../context/recipesContext';
import { fetchMealsOrDrinksByName } from '../../services/api';
import Recipe from './Recipe';
import Categories from '../Categories/Categories';

const MAX_RECIPES = 12;

function Recipes(props) {
  const { meal: { meals, setMeals },
    drink: { drinks, setDrinks } } = useContext(recipesContext);
  const { location: { pathname } } = props;
  const [type, setType] = useState('');

  useEffect(() => {
    console.log('componentDidMount()');
    if (pathname === '/foods') {
      fetchMealsOrDrinksByName('meals').then(({ meals: results }) => {
        const mealResults = results.filter((element, index) => index < MAX_RECIPES);
        setMeals(mealResults);
        setType('meals');
      });
    } else if (pathname === '/drinks') {
      fetchMealsOrDrinksByName('drinks').then(({ drinks: results }) => {
        const drinkResults = results.filter((element, index) => index < MAX_RECIPES);
        setDrinks(drinkResults);
        setType('drinks');
      });
    }
  }, []);

  useEffect(() => {
    console.log('componentDidUpdate()');
    if (meals.length > 1) {
      setMeals(meals);
    }
    if (drinks.length > 1) {
      setDrinks(drinks);
    }
  }, [setMeals, setDrinks]);

  const renderRecipes = () => {
    if (pathname === '/foods') {
      return meals.map((meal, index) => (<Recipe
        key={ meal.idMeal }
        index={ index }
        recipeName={ meal.strMeal }
        recipeImgScr={ meal.strMealThumb }
      />));
    }
    if (pathname === '/drinks') {
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
      <Categories type={ type } />
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
