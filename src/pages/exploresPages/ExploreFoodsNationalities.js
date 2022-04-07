import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { getRecipeRecommendeds } from '../../services/api';

function ExploreFoodsNationalities() {
  const MAX_RECIPES = 12;

  const [recipes, setRecipes] = useState([]);
  const [allNnationalities, setAllNationalities] = useState([]);
  const [selected, setSelected] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await getRecipeRecommendeds('meals');
      const responseNationalities = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const dataNationalities = await responseNationalities.json();

      setIsLoaded(true);

      const getRecipes = response.meals.splice(0, MAX_RECIPES);
      const getNationalities = dataNationalities.meals.map((recipe) => recipe.strArea);

      setAllNationalities(['All', ...getNationalities]);

      if (selected === 'All') {
        setRecipes(getRecipes);
      } else {
        const responseSelected = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`);
        const dataSelected = await responseSelected.json();

        setRecipes(dataSelected.meals.splice(0, MAX_RECIPES));
      }
    };
    requestAPI();
  }, []);

  console.log(recipes);

  return (
    <main>
      <Header
        title="Explore Nationalities"
        showSearch
      />
      { isLoaded && (
        <section>
          <label htmlFor="DropNationalities">
            <select
              id="DropNationalities"
              data-testid="explore-by-nationality-dropdown"
              onChange={ ({ target }) => setSelected(target.value) }
            >
              { allNnationalities.map((nationalitie, index) => (
                <option
                  data-testid={ `${nationalitie}-option` }
                  key={ index }
                >
                  { nationalitie }
                </option>
              )) }
            </select>
            { recipes.map((recipe, index) => (
              <Link to={ `/foods/${recipe.idMeal}` } key={ index }>
                <div
                  key={ index }
                  className="recipe__card"
                  data-testid={ `${index}-recipe-card` }
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
          </label>
        </section>
      ) }

      <BottomMenu />
    </main>

  );
}

export default ExploreFoodsNationalities;
