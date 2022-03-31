import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Foods from '../pages/Foods';

describe(`19 - Implemente os elementos do menu inferior 
respeitando os atributos descritos no protótipo`, () => {
  it('O menu inferior deve ter possuir o atributo `data-testid="footer"`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const footer = screen.getByTestId(/footer/i);
    expect(footer).toBeInTheDocument();
  });

  it(`O elemento que leva para a página de bebidas deve 
  possuir o atributo data-testid="drinks-bottom-btn"`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const drinkElem = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkElem).toBeInTheDocument();
  });

  it(`O elemento que leva para a página de explorar deve 
  possuir o atributo data-testid="explore-bottom-btn"`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const exploreElem = screen.getByTestId(/explore-bottom-btn/i);
    expect(exploreElem).toBeInTheDocument();
  });

  it(`O elemento que leva para a página de comidas deve 
  possuir o atributo data-testid="food-bottom-btn"`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const foodElem = screen.getByTestId(/food-bottom-btn/i);
    expect(foodElem).toBeInTheDocument();
  });
});

describe(`20 - Posicione o menu inferior de forma fixa e apresente 
  3 ícones: um para comidas, um para bebidas e outro para exploração`, () => {
  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    const { getByTestId } = renderWithRouter(<Foods />);

    expect(getByTestId(/footer/i)).toHaveStyle('position: fixed');
    expect(getByTestId(/footer/i)).toHaveStyle('bottom: 0px');
  });

  it(`Apresenta os ícones corretos (drinkIcon.svg, exploreIcon.svg 
    e mealIcon.svg, disponíveis na pasta 'src/images/')`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const drinkElem = screen.getByTestId(/drinks-bottom-btn/i);
    const exploreElem = screen.getByTestId(/explore-bottom-btn/i);
    const foodElem = screen.getByTestId(/food-bottom-btn/i);

    expect(drinkElem.src.includes(drinkIcon)).toBe(true);
    expect(exploreElem.src.includes(exploreIcon)).toBe(true);
    expect(foodElem.src.includes(mealIcon)).toBe(true);
  });
});

describe(`21 - Exiba o menu inferior apenas nas 
  telas indicadas pelo protótipo`, () => {
  const verify = (footerExist) => {
    if (footerExist) {
      const footer = screen.getByTestId(/footer/i);
      const drinkElem = screen.getByTestId(/drinks-bottom-btn/i);
      const exploreElem = screen.getByTestId(/explore-bottom-btn/i);
      const foodElem = screen.getByTestId(/food-bottom-btn/i);

      expect(footer).toBeInTheDocument();
      expect(drinkElem).toBeInTheDocument();
      expect(exploreElem).toBeInTheDocument();
      expect(foodElem).toBeInTheDocument();
    } else {
      const footer = screen.queryByTestId(/footer/i);
      expect(footer).not.toBeInTheDocument();
    }
  };

  it('Não tem footer na tela de login', () => {
    renderWithRouter(<App />);
    verify();
  });

  it('Tem footer na tela de principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');
    verify(true);
  });

  it('Tem footer na tela de principal de receitas de bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drinks');
    verify(true);
  });

  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods/5789');
    verify();
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drinks/5777');
    verify();
  });

  it('Não tem footer na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods/5777/in-progress');
    verify();
  });

  it('Não tem footer na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drink/5777/in-progress');
    verify();
  });

  it('Tem footer na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore');
    verify(true);
  });

  it('Tem footer na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/foods');
    verify(true);
  });

  it('Tem footer na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/drinks');
    verify(true);
  });
  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/foods/ingredients');
    verify(true);
  });

  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/drinks/ingredients');
    verify(true);
  });

  it('Tem footer na tela de explorar comidas por nacionalidade', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/foods/nationalities');
    verify(true);
  });

  it('Tem footer na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./profile');
    verify(true);
  });

  it('Não tem footer na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./done-recipes');
    verify();
  });

  it('Não tem footer na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./favorite-recipes');
    verify();
  });
});

describe(`22 - Redirecione a pessoa usuária para 
  uma lista de cocktails ao clicar no ícone de bebidas`, () => {
  it('Testando redirecionamento para bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const drinkElem = screen.getByTestId(/drinks-bottom-btn/i);
    userEvent.click(drinkElem);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});

describe(`23 - Redirecione a pessoa usuária 
  para a tela de explorar ao clicar no ícone de exploração`, () => {
  it('Testando redirecionamento para explore', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const exploreElem = screen.getByTestId(/explore-bottom-btn/i);
    userEvent.click(exploreElem);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });
});

describe(`24 - Redirecione a pessoa usuária 
  para uma lista de comidas ao clicar no ícone de comidas`, () => {
  it('Testando redirecionamento para comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const foodElem = screen.getByTestId(/food-bottom-btn/i);
    userEvent.click(foodElem);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
