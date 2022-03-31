import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../../context/recipesContext';
import Button from '../Forms/Button';
import { fetchMealsOrDrinksByName, fetchMealsOrDrinksCategories,
  fetchRecipesByCategory } from '../../services/api';

const MAX_CATEGORIES = 5;
const MAX_RECIPES = 12;
let sameCategory = '';

function Categories(props) {
  const { type } = props;
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const { meal: { setMeals }, drink: { setDrinks } } = useContext(recipesContext);

  useEffect(() => {
    if (type === 'meals') {
      fetchMealsOrDrinksCategories('meals').then((res) => {
        const categoriesResults = res
          .meals
          .filter((element, index) => index < MAX_CATEGORIES);
        setCategories(categoriesResults);
      });
    } else if (type === 'drinks') {
      fetchMealsOrDrinksCategories('drinks').then((res) => {
        const categoriesResults = res
          .drinks
          .filter((element, index) => index < MAX_CATEGORIES);
        setCategories(categoriesResults);
      });
    }
  }, [type]);

  const clickCategoryHandler = async (categoryName) => {
    try {
      let recipes;
      let drinks;
      let meals;
      if (isFiltered && sameCategory === categoryName) {
        recipes = await fetchMealsOrDrinksByName(type);
        if (type === 'drinks') {
          drinks = recipes.drinks.filter((element, index) => index < MAX_RECIPES);
          setDrinks(drinks);
        } else if (type === 'meals') {
          meals = recipes.meals.filter((element, index) => index < MAX_RECIPES);
          setMeals(meals);
        }
      } else {
        recipes = await fetchRecipesByCategory(type, categoryName);
        if (type === 'drinks') {
          drinks = recipes.drinks.filter((element, index) => index < MAX_RECIPES);
          setDrinks(drinks);
        } else if (type === 'meals') {
          meals = recipes.meals.filter((element, index) => index < MAX_RECIPES);
          setMeals(meals);
        }
      }
      sameCategory = categoryName;
      setIsFiltered(!isFiltered);
    } catch (err) {
      console.error(err.message);
    }
  };

  const renderCategories = () => categories.map(({ strCategory: category }, index) => (
    <Button
      key={ index }
      btnName={ category }
      dataTestid={ `${category}-category-filter` }
      clicked={ () => clickCategoryHandler(category) }
    />
  ));
  return (
    <div className="categories-container">
      { renderCategories() }
    </div>
  );
}

Categories.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Categories;
