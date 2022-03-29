import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
