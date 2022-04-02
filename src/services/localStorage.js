export const doneRecipes = (id) => {
  const result = localStorage.getItem('doneRecipes');
  const finalResult = JSON.parse(result);

  const verifyValue = finalResult === null
    ? false : finalResult.some((idFoods) => idFoods.id === id);

  if (verifyValue) {
    return false;
  }
  return true;
};

export const inProgressMeals = (id) => {
  const result = localStorage.getItem('inProgressRecipes');
  const finalResult = JSON.parse(result);

  const verifyValue = finalResult === null
    ? false : Object.entries(finalResult.meals)
      .some((idFoods) => Number(idFoods[0]) === id);

  if (verifyValue) {
    return true;
  }
  return false;
};

export const inProgressDrinks = (id) => {
  const result = localStorage.getItem('inProgressRecipes');
  const finalResult = JSON.parse(result);

  const verifyValue = finalResult === null
    ? false : Object.entries(finalResult.cocktails)
      .some((idDrinks) => Number(idDrinks[0]) === id);

  if (verifyValue) {
    return true;
  }
  return false;
};

export const favorites = (id) => {
  const response = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(response);

  const verifyValue = data === null
    ? false : data.some((idFav) => Number(idFav.id) === id);

  if (verifyValue) {
    return true;
  }
  return false;
};

export const removeFavorites = (id) => {
  const response = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(response);

  const resetLocalStorage = data
    .filter((desfavorite) => desfavorite.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(resetLocalStorage));
};

export const addInFavorites = (foodsObject) => {
  console.log(foodsObject);
  const response = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(response);

  const verifyValue = data === null
    ? false : data.some((idFav) => Number(idFav.id) === id);

  if (verifyValue) {
    const resetLocalStorage = [...data, foodsObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(resetLocalStorage));
  } else {
    const resetLocalStorage = [foodsObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(resetLocalStorage));
  }
};
