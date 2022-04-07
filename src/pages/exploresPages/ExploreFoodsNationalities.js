import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import recipesContext from '../../context/recipesContext';
import { getRecipeRecommendeds } from '../../services/api';

function ExploreFoodsNationalities() {
  const MAX_RECIPES = 12;
  const { recipes: { recipeList } } = useContext(recipesContext);
  const [nationalities, setNationalities] = useState(['All']);
  const [recipes, setRecipes] = useState(recipeList);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipeRecommendeds('meals');
      const recipesResults = response.meals.slice(0, MAX_RECIPES);
      return recipesResults;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNacionalities = async () => {
    try {
      const responseNationalities = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const dataNationalities = await responseNationalities.json();
      const nacionalityResults = dataNationalities.meals.map((recipe) => recipe.strArea);
      setNationalities([...nationalities, ...nacionalityResults]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const filterRecipesByNacionality = async (nacionality) => {
    try {
      const responseSelected = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nacionality}`);
      const dataSelected = await responseSelected.json();
      const filteredRecipes = dataSelected.meals.slice(0, MAX_RECIPES);
      return filteredRecipes;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRecipes().then((allRecipes) => {
      setRecipes(allRecipes);
    });
    fetchNacionalities().then();
  }, []);

  const filterRecipes = async ({ target }) => {
    if (target.value === 'All') {
      setRecipes(recipeList);
    } else {
      const filterdRecipes = await filterRecipesByNacionality(target.value);
      setRecipes(filterdRecipes);
    }
  };

  console.log(recipes);
  return (
    <main>
      <Header
        title="Explore Nationalities"
        showSearch
      />
      { nationalities.length > 1 && (
        <section>
          <label htmlFor="DropNationalities">
            <select
              id="DropNationalities"
              data-testid="explore-by-nationality-dropdown"
              onChange={ filterRecipes }
            >
              { nationalities.map((nationalitie, index) => (
                <option
                  data-testid={ `${nationalitie}-option` }
                  key={ index }
                  value={ nationalitie }
                >
                  { nationalitie }
                </option>
              )) }
            </select>
          </label>
          <div>
            { recipes.length > 0 && recipes.map((recipe, index) => (
              <Link
                to={ `/foods/${recipe.idMeal}` }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <div
                  key={ index }
                  className="recipe__card"

                >
                  <h4
                    className="recipe__name"
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strMeal}
                  </h4>
                  <img
                    src={ recipe.strMealThumb }
                    alt={ `recipe ${recipe.strMeal} img ${index}` }
                    className="recipe__img"
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                </div>
              </Link>
            )) }
          </div>
        </section>
      ) }

      <BottomMenu />
    </main>

  );
}

export default ExploreFoodsNationalities;
