import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/home" component={ Home } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
