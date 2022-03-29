import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validateEmail from '../helpers/helpers';
import '../styles/login.css';

const MIN_LENGTH = 6;

function Login(props) {
  const { history: { push } } = props;
  const [user, setUser] = useState({ email: '' });
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const inputChangeHandler = ({ target }) => {
    if (target.name === 'email') {
      setUser({ email: target.value });
      setValidEmail(validateEmail(target.value));
    } else {
      const isValid = target.value.length > MIN_LENGTH;
      setValidPassword(isValid);
    }
  };

  const inputSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event);

    // set token to localStorage
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    // save email to localstorage
    localStorage.setItem('user', JSON.stringify(user));

    // redirect to Foods
    push('/foods');
  };

  return (
    <div className="login-container">
      <form onSubmit={ inputSubmitHandler } className="login-form">
        <label htmlFor="email" className="login__label">
          E-mail:
          <input
            id="email"
            className="login__input"
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ inputChangeHandler }
            value={ user.email }
          />
        </label>
        <label htmlFor="senha" className="login__label">
          Senha:
          <input
            id="senha"
            className="login__input"
            type="password"
            data-testid="password-input"
            name="password"
            minLength="7"
            onChange={ inputChangeHandler }
          />
        </label>
        <button
          id="btEnter"
          className="login__btn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !(validEmail && validPassword) }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.defaulftProps = {
  history: {},
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
