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
    match: { path, params: { id } }, type } = props;

  const recipeType = type === 'meals' ? 'Meal' : 'Drink';
  // add match, path, params e filter
  useEffect(() => {
    if (path === '/foods/:id') {
      fetchMealsOrDrinksByName(type).then(({ [type]: results }) => {
        const recipeResults = results.filter((_element) => {
          const recipeElements = Object.values(_element)
            .filter((item) => item);
          const recipeElementsToLower = recipeElements.map((item) => item.toLowerCase());
          return recipeElementsToLower.includes(id.toLowerCase());
        });
        console.log(type);

        if (type === 'meals') {
          setMeals(recipeResults);
        } else {
          setDrinks(recipeResults);
        }
      });
    } else {
      fetchMealsOrDrinksByName(type).then(({ [type]: results }) => {
        const recipeResults = results.filter((_element, index) => index < MAX_RECIPES);
        if (type === 'meals') {
          setMeals(recipeResults);
        } else {
          setDrinks(recipeResults);
        }
      });
    }
  }, [pathname, setMeals, setDrinks, path, id, type]);

  useEffect(() => {
    if (meals.length > 1) {
      setMeals(meals);
    }
    if (drinks.length > 1) {
      setDrinks(drinks);
    }
  }, [setMeals, setDrinks, meals, drinks]);

  const renderRecipes = () => {
    let recipes;
    let recipePath;
    if (type === 'meals') {
      recipes = meals;
      recipePath = '/foods';
    } else {
      recipes = drinks;
      recipePath = '/drinks';
    }
    if (recipes?.length > 0) {
      return recipes.map((recipe, index) => (<Recipe
        key={ index }
        index={ index }
        recipeName={ recipe[`str${recipeType}`] }
        recipeImgSrc={ recipe[`str${recipeType}Thumb`] }
        recipeId={ recipe[`id${recipeType}`] }
        recipeType={ recipePath }
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
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,

};

export default withRouter(Recipes);
