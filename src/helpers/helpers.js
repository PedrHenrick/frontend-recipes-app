const checkIfItemsInStorage = (target, storage, recipeId) => {
  const recipeIngredients = {};
  if (!storage) {
    recipeIngredients[recipeId] = [target.value];
  } else {
    const ingredients = JSON.parse(storage)[recipeId] === {}
      ? [] : JSON.parse(storage)[recipeId];
    const isOnList = ingredients?.includes(target.value) ?? true;
    if (!isOnList) {
      recipeIngredients[recipeId] = [...ingredients, target.value];
    } else {
      recipeIngredients[recipeId] = ingredients;
    }
  }
  return recipeIngredients;
};

const removeItemFromStorage = (storage, target, recipeId) => {
  const recipeIngredients = {};
  const ingredients = JSON.parse(storage)[recipeId] ?? [];
  const filteredIngredients = ingredients
    .filter((ingredient) => ingredient !== target.value);
  recipeIngredients[recipeId] = filteredIngredients;
  return recipeIngredients;
};

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
  let recipeIngredients = {};

  if (target.checked) {
    recipeIngredients = checkIfItemsInStorage(target, storage, recipeId);
  } else if (!target.checked && storage) {
    recipeIngredients = removeItemFromStorage(storage, target, recipeId);
  }
  localStorage.setItem(recipeType, JSON.stringify(recipeIngredients));
};

export const saveFavoriteRecipesInStorage = (recipe, type) => {
  let favorites = [];
  const storage = localStorage.getItem('favoriteRecipes');
  const favoriteRecipe = {
    id: recipe[`id${type}`],
    type: type === 'Meal' ? 'food' : 'drink',
    nationality: type === 'Drink' ? '' : recipe.strArea,
    category: recipe.strCategory,
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    alcoholicOrNot: type === 'Drink' ? recipe.strAlcoholic : '',
  };

  if (!storage || Object.keys(storage).length === 0) {
    favorites = [favoriteRecipe];
  } else {
    const favoritesInStorage = JSON.parse(storage);
    favorites = [...favoritesInStorage, favoriteRecipe];
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};

export const removeFavoriteRecipeFromStorage = (recipeId) => {
  const storage = localStorage.getItem('favoriteRecipes');
  if (storage && Object.keys(storage).length > 0) {
    const refreshedFavorites = JSON.parse(storage).filter(({ id }) => recipeId !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(refreshedFavorites));
  }
};

export const matchArrays = (...arrays) => {
  if (arrays[0].length !== arrays[1].length) return false;
  for (let index = 0; index < arrays[0].length; index += 1) {
    if (arrays[0][index] !== arrays[1][index]) return false;
  }
  return true;
};

export const checkEveryValue = (arrayItems) => {
  const values = arrayItems.map((element) => {
    const [value] = Object.values(element);
    return value;
  });
  return values.every((value) => value);
};

export const currentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const currentDateCreator = `${day}/${month}/${year}`;

  return currentDateCreator;
};
