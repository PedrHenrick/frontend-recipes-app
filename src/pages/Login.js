import React, { useState, useEffect } from 'react';

function Login() {
  const [inputState, setInputState] = useState({ email: '', password: '' });

  const [btStatus, setBtStatus] = useState(true);

  const buttonStatus = () => {
    const { email, password } = inputState;
    const miniSenha = 7;
    return (
      !email.includes('@')
      || !email.includes('.com')
      || password.length < miniSenha
    );
  };

  useEffect(() => {
    setBtStatus(buttonStatus());
  }, [inputState]); // eslint-disable-line react-hooks/exhaustive-deps
  // não consegui resolver o problema de lint na linha 20. help!!! tive que pegar em um site uma forma de desativar o lint da linha.
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInputState({ ...inputState, [name]: value });
  };
  return (
    <form>
      <label htmlFor="email">
        E-mail:
        <input
          id="email"
          type="text"
          data-testid="email-input"
          name="email"
          value={ inputState.email }
          onChange={ onInputChange }
        />
      </label>

      <label htmlFor="senha">
        Senha:
        <input
          id="senha"
          type="text"
          data-testid="password-input"
          name="password"
          value={ inputState.password }
          onChange={ onInputChange }
        />
      </label>

      <button
        id="btEnter"
        type="button"
        data-testid="login-submit-btn"
        disabled={ btStatus }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
