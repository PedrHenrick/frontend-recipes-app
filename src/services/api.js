const invalidType = () => { throw new Error('tipo tem que ser "meals" ou "drinks"'); };

export const fetchMealsOrDrinksByIngredient = async (type, ingredient) => {
  try {
    let url;
    if (!ingredient.trim()) throw new Error('ingredient não foi definido.');

    if (type === 'drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else if (type === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else {
      invalidType();
    }

    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchMealsOrDrinksByName = async (type, name = '') => {
  try {
    let url;

    if (type === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    } else if (type === 'drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    } else {
      invalidType();
    }

    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchMealsOrDrinksByFirstLetter = async (type, letter) => {
  try {
    let url;
    if (!letter.trim()) {
      throw new Error('Parametro invalido');
    }

    if (type === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    } else if (type === 'drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
    } else {
      invalidType();
    }

    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchMealsOrDrinksCategories = async (type) => {
  try {
    let url;

    if (type === 'meals') {
      url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    } else if (type === 'drinks') {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    } else {
      invalidType();
    }

    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchRecipesByCategory = async (type, category) => {
  try {
    let url;
    let categoryFiltered;
    if (category.startsWith('Ordinary')) {
      categoryFiltered = category.replace(' ', '_');
    } else {
      categoryFiltered = encodeURIComponent(category);
    }
    console.log('cat', categoryFiltered);

    if (type === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFiltered}`;
    } else if (type === 'drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryFiltered}`;
    } else {
      invalidType();
    }

    const data = await fetch(url);
    const results = await data.json();
    console.log(results);
    return results;
  } catch (err) {
    console.error(err.message);
  }
};
