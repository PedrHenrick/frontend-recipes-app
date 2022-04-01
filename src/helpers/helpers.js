// Reference https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
export const validateEmail = (email) => email
  .toLowerCase()
  .match(/\S+@\S+\.\S+/);

export const getMealsOrDrinks = (type, data, searchType) => {
  let results;

  if (searchType !== 'firstletter') {
    if (type === 'drinks') {
      const { drinks } = data;
      results = drinks;
    } else {
      const { meals } = data;
      results = meals;
    }
    return results;
  }
};

export const getIngredientsAndMeasurements = (recipe) => {
  const ingredientsKeyValue = Object.entries(recipe);
  const ingredients = ingredientsKeyValue
    .filter(([key, value]) => key.startsWith('strIngredient') && value?.length > 0)
    .map((ingredient) => ingredient[1]);

  const measurements = ingredientsKeyValue
    .filter(([key, value]) => key.startsWith('strMeasure') && value?.length > 0)
    .map((measure) => measure[1]);

  return [ingredients, measurements];
};

export const saveIngredientsInStorage = (target, recipeId, recipeType) => {
  const storage = localStorage.getItem(recipeType) ?? false;
  const recipeIngredients = {};

  if (target.checked) {
    if (!storage) {
      recipeIngredients[recipeId] = [target.value];
    } else {
      const ingredients = JSON.parse(storage)[recipeId];
      const isOnList = ingredients.includes(target.value);
      if (!isOnList) {
        recipeIngredients[recipeId] = [...ingredients, target.value];
      } else {
        recipeIngredients[recipeId] = ingredients;
      }
    }
  } else if (!target.checked && storage) {
    const ingredients = JSON.parse(storage)[recipeId];
    const filteredIngredients = ingredients
      .filter((ingredient) => ingredient !== target.value);
    recipeIngredients[recipeId] = filteredIngredients;
  }
  localStorage.setItem(recipeType, JSON.stringify(recipeIngredients));
};
