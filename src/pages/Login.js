import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css';

function Login(props) {
  useEffect(() => {
    const requisition = async () => {
      const response = await
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      console.log(data.meals);
    };
    requisition();
  }, []);

  const { history: { push } } = props;
  const [inputState, setInputState] = useState({ email: '', password: '' });

  const changeButtonStatus = () => {
    const { email, password } = inputState;
    const miniSenha = 7;
    return (
      !email.includes('@')
      || !email.includes('.com')
      || password.length < miniSenha
    );
  };

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    setInputState({ ...inputState, [name]: value });
  };

  const inputSubmitHandler = (event) => {
    event.preventDefault();

    // set token to localStorage
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    // save email to localstorage
    const user = {
      email: inputState.email,
    };
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
            value={ inputState.email }
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
          disabled={ changeButtonStatus() }
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
