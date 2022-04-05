import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import App from '../App';

const INGREDIENT_INPUT = 'ingredient-search-radio';
const NAME_SEARCH_INPUT = 'name-search-radio';
const FIRST_LETTER_INPUT = 'first-letter-search-radio';

describe('Teste o componente `<SearchBar />`', () => {
  test('Se há 3 inputs do tipo `radio` para rota `/foods`', () => {
    const history = createMemoryHistory();
    history.push('/foods');

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const ingredientRadio = screen.getByTestId(INGREDIENT_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_INPUT);
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
  test('Se há 3 inputs do tipo `radio` para rota `/drinks`', () => {
    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const ingredientRadio = screen.getByTestId(INGREDIENT_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_INPUT);
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
  test('Se há 1 button com texto `Search`', () => {
    const history = createMemoryHistory();
    history.push('/foods');

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const searchBtn = screen.getAllByRole('button', { name: /Search/i })[0];
    expect(searchBtn).toBeInTheDocument();
  });
  // test('Se ao clicar no button é feita uma chamada na api', () => {});
  // test('Se ao clicar no button é redirecionada pra details para meals e drinks',
  //   () => {});
});
