import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Forms/Button';
import { fetchMealsOrDrinksCategories } from '../../services/api';

const MAX_CATEGORIES = 5;

function Categories(props) {
  const { type } = props;
  const [categories, setCategories] = useState([]);

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

  console.log(categories, type);

  const renderCategories = () => categories.map(({ strCategory: category }, index) => (
    <Button
      key={ index }
      btnName={ category }
      dataTestid={ `${category}-category-filter` }
      clicked={ clickCategoryHandler }
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
