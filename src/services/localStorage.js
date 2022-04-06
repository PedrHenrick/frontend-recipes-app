// funções relacionadas às receitas favoritas
export const getDoneRecipes = () => {
  const response = localStorage.getItem('doneRecipes');
  const data = JSON.parse(response);

  const verifyValue = data === null
    ? [] : data;

  return verifyValue;
};

export const removeDoneRecipes = () => {
  const response = localStorage.getItem('doneRecipes');
  const data = JSON.parse(response);

  const resetLocalStorage = data
    .filter((unfinished) => unfinished.id !== id);
  localStorage.setItem('doneRecipes', JSON.stringify(resetLocalStorage));
};

export const addDoneRecipes = (ObjectItem) => {
  const response = localStorage.getItem('doneRecipes');
  const data = JSON.parse(response);

  if (data !== null) {
    const resetLocalStorage = [...data, ObjectItem];
    localStorage.setItem('doneRecipes', JSON.stringify(resetLocalStorage));
  } else {
    const resetLocalStorage = [ObjectItem];
    localStorage.setItem('doneRecipes', JSON.stringify(resetLocalStorage));
  }
};

// funções relacionadas as receitas em progresso
export const getInProgress = () => {
  const response = localStorage.getItem('inProgressRecipes');
  const data = JSON.parse(response);

  const verifyValue = data === null
    ? {} : data;

  return verifyValue;
};

export const addInProgressMeals = (mealsInProgress) => {
  const response = localStorage.getItem('inProgressRecipes');
  const data = JSON.parse(response);

  if (data !== null) {
    const resetLocalStorage = {
      ...data,
      meals: { ...data.meals, ...mealsInProgress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(resetLocalStorage));
  } else {
    const resetLocalStorage = {
      ...data,
      meals: { ...mealsInProgress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(resetLocalStorage));
  }
};

export const addInProgressDrinks = (cocktailsInProgress) => {
  const response = localStorage.getItem('inProgressRecipes');
  const data = JSON.parse(response);

  if (data !== null) {
    const resetLocalStorage = {
      ...data,
      cocktails: { ...data.cocktails, ...cocktailsInProgress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(resetLocalStorage));
  } else {
    const resetLocalStorage = {
      ...data,
      cocktails: { ...cocktailsInProgress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(resetLocalStorage));
  }
};

// funções relacionadas aos favoritos
export const getfavorites = () => {
  const response = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(response);

  const verifyValue = data === null
    ? [] : data;

  return verifyValue;
};

export const removeFavorites = (id) => {
  const response = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(response);

  const resetLocalStorage = data
    .filter((desfavorite) => desfavorite.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(resetLocalStorage));
};

export const addInFavorites = (foodsObject) => {
  const response = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(response);

  if (data !== null) {
    const resetLocalStorage = [...data, foodsObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(resetLocalStorage));
  } else {
    const resetLocalStorage = [foodsObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(resetLocalStorage));
  }
};
