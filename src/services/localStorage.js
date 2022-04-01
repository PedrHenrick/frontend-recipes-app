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

export const inProgress = (id) => {
  const result = localStorage.getItem('inProgressRecipes');
  const finalResult = JSON.parse(result);

  const verifyValue = finalResult === null
    ? false : finalResult.some((idFoods) => idFoods.id === id);

  if (verifyValue) {
    return true;
  }
  return false;
};
