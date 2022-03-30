import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../components/Header';
import Recipes from '../components/Recipes/Recipes';
import SearchBar from '../components/SearchBar';
import recipesContext from '../context/recipesContext';

function Foods() {
  const { meal: { meals } } = useContext(recipesContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (meals.length > 1) {
      setIsLoaded(true);
    }
  }, [meals]);

  return (
    <div>
      <HeaderPage
        title="Foods"
        showSearch
      />
      <SearchBar type="meals" />
      { isLoaded && <Recipes /> }
    </div>
  );
}

export default Foods;
