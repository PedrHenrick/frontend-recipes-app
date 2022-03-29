// Reference https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const validateEmail = (email) => email
  .toLowerCase()
  .match(/\S+@\S+\.\S+/);

export default validateEmail;
