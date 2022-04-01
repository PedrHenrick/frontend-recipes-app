import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Favorite from './pages/Favorite';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ExploreDrinks from './pages/exploresPages/ExploreDrinks';
import ExploreFoods from './pages/exploresPages/ExploreFoods';
import ExploreFoodsNationalities from './pages/exploresPages/ExploreFoodsNationalities';
import FoodsInProgress from './pages/InProgessPages/FoodsInProgress';
import DrinksInProgress from './pages/InProgessPages/DrinksInProgress';
import FoodsDescription from './pages/descriptionPage/FoodsDescription';
import DrinksDescription from './pages/descriptionPage/DrinkDescription';
import ExploreFoodsIngredients from './pages/exploresPages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/exploresPages/ExploreDrinksIngredients';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ Favorite } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/foods/:food_recipes_id" component={ FoodsDescription } />
        <Route exact path="/drinks/:drink_recipes_id" component={ DrinksDescription } />
        <Route path="/foods/:recipe_id/in-progress" component={ FoodsInProgress } />
        <Route
          path="/drinks/:recipe_id/in-progress"
          component={ DrinksInProgress }
        />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
        <Route
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
