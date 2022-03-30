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
