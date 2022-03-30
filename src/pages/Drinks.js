import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../context/recipesContext';
import HeaderPage from '../components/Header';
import Recipes from '../components/Recipes/Recipes';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const { drink: { drinks } } = useContext(recipesContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (drinks.length > 1) {
      setIsLoaded(true);
    }
  }, [drinks]);
  return (
    <div>
      <HeaderPage
        title="Drinks"
        showSearch
      />
      <SearchBar type="drinks" />
      { isLoaded && <Recipes /> }
    </div>
  );
}

export default Drinks;
