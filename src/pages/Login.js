import React, { useState } from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        E-mail:
        <input
          id="email"
          type="text"
          data-testid="email-input"
          /* name="email"
          value={ email } */
        />
      </label>

      <label htmlFor="senha">
        Senha:
        <input
          id="senha"
          type="text"
          data-testid="password-input"
          /* name="email"
          value={ email } */
        />
      </label>

      <button
        id="btEnter"
        type="button"
        data-testid="login-submit-btn"
        /* disabled={ isDisabled }
        onClick={ this.btEnterClick } */
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
