import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
// import { mockAllMeals } from './mockMeals/mockAllMeals';
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

  /* test('Se ao clicar no botão "Search" é feita uma chamada de busca', async () => {
    const history = createMemoryHistory();
    history.push('/foods');

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAllMeals),
    });

    expect(global.fetch).toHaveBeenCalled();
  });
}); */

  /*
  test('Se ao clicar no button é redirecionada pra details para meals e drinks',
    () => {});
});

test('Busque na API de comidas caso a pessoa esteja na página de comidas e na de bebidas caso esteja na de bebidas')
test(' Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL')
test('Mostre as receitas em cards caso mais de uma receita seja encontrada')
test(' Exiba um alert caso nenhuma receita seja encontrada')
 */

  // test('Se exibe um alert caso nenhuma receita seja enconrada', () => {
  //   const testError = 'Sorry, we haven\'t found any recipes for these filters.';
  //   const history = createMemoryHistory();
  //   history.push('/foods');

//     render(
//       <Router history={ history }>
//         <App />
//       </Router>,
//     );
//     const spyAlert = jest.spyOn(Alert, 'alert')
//       .mockImplementation(
//     (title, message, callbackOrButton) => callbackOrButtons[1].onPress());
//     userEvent.click(btSearch);
//     expect(global.fetch).toHaveBeenCalled(spyAlert);
//   });
});
