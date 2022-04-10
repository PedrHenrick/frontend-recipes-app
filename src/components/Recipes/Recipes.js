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
  const { location: { pathname },
    match: { path, params: { filter } } } = props;
  // add match, path, params e filter
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
      }); // add
    } else if (path === '/foods/:filter') {
      fetchMealsOrDrinksByName('meals').then(({ meals: results }) => {
        const mealsResults = results.filter((_element) => {
          const recipeElements = Object.values(_element)
            .filter((item) => item);
          const recipeElementsToLower = recipeElements.map((item) => item.toLowerCase());
          return recipeElementsToLower.includes(filter.toLowerCase());
        });
        setMeals(mealsResults);
      });
    } else if (path === '/drinks/:filter') {
      fetchMealsOrDrinksByName('drinks').then(({ drinks: results }) => {
        const drinksResults = results.filter((_element) => {
          const drinksElements = Object.values(_element)
            .filter((item) => item);
          const recipeElementsToLower = drinksElements.map((item) => item.toLowerCase());
          return recipeElementsToLower.includes(filter.toLowerCase());
        });
        setDrinks(drinksResults);
      });
    }
  }, [pathname, setMeals, setDrinks, path, filter]);

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
    } // add
    if (path === '/foods/:filter') {
      return meals.map((meal, index) => (<Recipe
        key={ index }
        index={ index }
        recipeName={ meal.strMeal }
        recipeImgSrc={ meal.strMealThumb }
        recipeId={ meal.idMeal }
        recipeType="/foods"
        data-testid={ `${index}-recipe-card` }
      />));
    }
    if (path === '/drinks/:filter') {
      return drinks.map((drink, index) => (<Recipe
        key={ index }
        index={ index }
        recipeName={ drink.strDrink }
        recipeImgSrc={ drink.strDrinkThumb }
        recipeId={ drink.idDrink }
        recipeType="/drinks"
        data-testid={ `${index}-recipe-card` }
      />));
    }
  };
  return (
    <div className="recipe-container">
      <Categories type={ pathname === '/foods' ? 'meals' : 'drinks' } />
      <div className="recipes">
        { renderRecipes() }
      </div>
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      filter: PropTypes.string,
    }).isRequired,
  }).isRequired,

};

export default withRouter(Recipes);
