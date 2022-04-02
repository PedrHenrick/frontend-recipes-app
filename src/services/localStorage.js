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
