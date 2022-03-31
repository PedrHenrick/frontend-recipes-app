import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../../context/recipesContext';
import Button from '../Forms/Button';
import { fetchMealsOrDrinksCategories, fetchRecipesByCategory } from '../../services/api';

const MAX_CATEGORIES = 5;
const MAX_RECIPES = 12;

function Categories(props) {
  const { type } = props;
  const [categories, setCategories] = useState([]);
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
      const recipes = await fetchRecipesByCategory(type, categoryName);
      if (type === 'drinks') {
        const drinks = recipes.drinks.filter((element, index) => index < MAX_RECIPES);
        setDrinks(drinks);
      } else if (type === 'meals') {
        const meals = recipes.meals.filter((element, index) => index < MAX_RECIPES);
        setMeals(meals);
      }
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
