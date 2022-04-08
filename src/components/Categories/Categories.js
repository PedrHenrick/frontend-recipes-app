import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../../context/recipesContext';
import Button from '../Forms/Button';
import { fetchMealsOrDrinksByName, fetchMealsOrDrinksCategories,
  fetchRecipesByCategory } from '../../services/api';
import '../../styles/searchBar.css';

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
      fetchMealsOrDrinksCategories('meals').then((recipeCategory) => {
        const categoriesResults = recipeCategory
          .meals
          .filter((element, index) => index < MAX_CATEGORIES);
        setCategories(categoriesResults);
      });
    } else if (type === 'drinks') {
      fetchMealsOrDrinksCategories('drinks').then((recipeCategory) => {
        const categoriesResults = recipeCategory
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
      if ((isFiltered && sameCategory === categoryName) || categoryName === 'All') {
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
      btnClass="category__btn"
      key={ index }
      dataTestid={ `${category}-category-filter` }
      clicked={ () => clickCategoryHandler(category) }
    >
      {category}
    </Button>
  ));
  return (
    <div className="categories-container">
      { renderCategories() }
      <Button
        btnClass="category__btn"
        dataTestid="All-category-filter"
        clicked={ () => clickCategoryHandler('All') }
      >
        All
      </Button>
    </div>
  );
}

Categories.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Categories;
