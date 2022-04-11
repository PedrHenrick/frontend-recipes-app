import React, { useContext, useEffect, useState } from 'react';
import Recipe from '../../components/Recipes/Recipe';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import recipesContext from '../../context/recipesContext';
import { getRecipeRecommendeds } from '../../services/api';
import { setCountryFlag } from '../../helpers/helpers';

function ExploreFoodsNationalities() {
  const MAX_RECIPES = 12;
  const { recipes: { recipeList } } = useContext(recipesContext);
  const [nationalities, setNationalities] = useState(['All']);
  const [selectedNacionality, setSelectedNacionality] = useState('unknown');
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
    }).catch((err) => console.error(err.message));
    fetchNacionalities().then().catch((err) => console.error(err.message));
  }, []);

  const filterRecipes = async ({ target }) => {
    if (target.value === 'All') {
      setSelectedNacionality('unknown');
      setRecipes(recipeList);
    } else {
      const filterdRecipes = await filterRecipesByNacionality(target.value);
      setRecipes(filterdRecipes);
      setSelectedNacionality(target.value);
    }
  };

  return (
    <div className="food-container">
      <Header
        title="Explore Nationalities"
        showSearch
      />
      { nationalities.length > 1 && (
        <section>
          <label htmlFor="DropNationalities" className="nacionality__label">
            <img
              className="nacionality__img"
              src={ setCountryFlag(selectedNacionality) }
              alt="flag of unknown"
            />
            <select
              className="nacionality__select"
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
            { recipes.length > 0 && (
              <div className="recipes">
                { recipes.map((recipe, index) => (
                  <Recipe
                    key={ index }
                    dataTestid={ `${index}-recipe-card` }
                    recipeName={ recipe.strMeal }
                    recipeImgSrc={ recipe.strMealThumb }
                    recipeId={ recipe.idMeal }
                    recipeType="/foods"
                  />
                )) }
              </div>
            ) }
          </div>
        </section>
      ) }

      <BottomMenu />
    </div>

  );
}

export default ExploreFoodsNationalities;
