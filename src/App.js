import React from 'react';
import PropTypes from 'prop-types';
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
import NotFoundPage from './pages/NotFoundPage';

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
        <Route
          path="/foods/:recipe_id/in-progress"
          component={ FoodsInProgress }
        />
        <Route
          path="/drinks/:recipe_id/in-progress"
          component={ DrinksInProgress }
        />
        <Route
          path="/drinks/:id"
          render={ (props) => {
            const { history, match: { params: { id } } } = props;
            const paramId = Number(id);
            console.log(paramId);
            if (Number.isNaN(paramId)) {
              return <Drinks history={ history } />;
            }
            return <DrinksDescription history={ history } />;
          } }
        />
        <Route
          path="/foods/:id"
          render={ (props) => {
            const { history, match: { params: { id } } } = props;
            const paramId = Number(id);
            console.log(paramId);
            if (Number.isNaN(paramId)) {
              return <Foods history={ history } />;
            }
            return <FoodsDescription history={ history } />;
          } }
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
        <Route path="*" component={ NotFoundPage } />
      </Switch>
    </RecipesProvider>
  );
}

App.defaultProps = {
  match: undefined,
  history: undefined,
};

App.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.objectOf(PropTypes.any),
};

export default App;
