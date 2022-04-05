import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

const PASSWORD_INPUT_TEST_ID = 'password-input';
const EMAIL_INPUT_TEST_ID = 'email-input';
const DATA_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL_0 = 'email';
const INVALID_EMAIL_1 = 'email@com@';
const INVALID_EMAIL_2 = 'emailcom@';
const INVALID_EMAIL_3 = 'alguem@email.';
const INVALID_PASSWORD = '123456';

describe('Testes da página de Login', () => {
  test('Teste se a página consta os campos de email e senha', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(passwordInput).toBeInTheDocument();
  });
});

describe('Testes de funcionamenos do botão', () => {
  test('Teste se na tela inicial possui um botão "Enter" ', () => {
    renderWithRouter(<App />);

    const btEnter = screen.getByTestId(DATA_TEST_ID);
    expect(btEnter).toBeInTheDocument();
  });

  describe('Teste se o botão se encontra desabilitado assim que a'
  + 'página é carregada', () => {
    test('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
      renderWithRouter(<App />);

      const button = screen.getByTestId(DATA_TEST_ID);
      expect(button).toBeDisabled();

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(email, INVALID_EMAIL_0);
      userEvent.type(senha, VALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, INVALID_EMAIL_1);
      userEvent.type(senha, VALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, INVALID_EMAIL_2);
      userEvent.type(senha, VALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(senha, INVALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, INVALID_EMAIL_3);
      userEvent.type(senha, VALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(senha, VALID_PASSWORD);
      expect(button).toBeEnabled();
    });
  });

  test('A rota deve ser mudada para \'/foods\' após o clique no botão "Enter".', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(DATA_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/foods');
  });
});
