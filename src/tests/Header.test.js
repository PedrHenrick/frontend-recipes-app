import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Header from '../components/Header';

describe(`9 - Implemente os elementos do header na tela principal de receitas, 
respeitando os atributos descritos no protótipo`, () => {
  it('Testando se há os data-testids corretos', () => {
    renderWithRouter(<Header />);
    const profileHeader = screen.queryByTestId(/profile-top-btn/i);
    const PageHeader = screen.queryByTestId(/profile-top-btn/i);
    const SearchHeader = screen.queryByTestId(/search-top-btn/i);

    expect(profileHeader).toBeInTheDocument();
    expect(PageHeader).toBeInTheDocument();
    expect(SearchHeader).toBeInTheDocument();
  });
});

describe(`10 - Implemente um ícone para a tela de perfil, 
  um título e um ícone para a busca, caso exista no protótipo`, () => {
  const verify = (titlePage, profile, title, search) => {
    if (profile && title && !search) {
      const profileHeader = screen.queryByTestId(/profile-top-btn/i);
      const PageHeader = screen.queryByTestId(/profile-top-btn/i);
      const titlePageInHeader = screen.queryByText(titlePage);
      const SearchHeader = screen.queryByTestId(/search-top-btn/i);

      expect(profileHeader).toBeInTheDocument();
      expect(PageHeader).toBeInTheDocument();
      expect(titlePageInHeader).toBeInTheDocument();
      expect(SearchHeader).not.toBeInTheDocument();
    } else if (profile && title && search) {
      const profileHeader = screen.queryByTestId(/profile-top-btn/i);
      const PageHeader = screen.queryByTestId(/profile-top-btn/i);
      const titlePageInHeader = screen.queryByText(titlePage);
      const SearchHeader = screen.queryByTestId(/search-top-btn/i);

      expect(profileHeader).toBeInTheDocument();
      expect(PageHeader).toBeInTheDocument();
      expect(titlePageInHeader).toBeInTheDocument();
      expect(SearchHeader).toBeInTheDocument();
    } else {
      const heading = screen.queryByTestId(/heading/i);
      expect(heading).not.toBeInTheDocument();
    }
  };

  it('Não tem header na tela de login', () => {
    renderWithRouter(<App />);
    const heading = screen.queryByTestId(/heading/i);
    expect(heading).not.toBeInTheDocument();
  });

  it(`O header tem os ícones corretos na
    tela de principal de receitas de comidas`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Foods', true, true, true);
  });

  it(`O header tem os ícones corretos na
    tela de principal de receitas de bebidas`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drinks');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Drinks', true, true, true);
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods/5748');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).not.toBeInTheDocument();
    verify();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drinks/5748');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).not.toBeInTheDocument();
    verify();
  });

  it('Não tem header na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods/5789/in-progress');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).not.toBeInTheDocument();
    verify();
  });

  it('Não tem header na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./drinks/5777/in-progress');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).not.toBeInTheDocument();
    verify();
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Explore', true, true);
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/foods');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Explore Foods', true, true);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/drinks');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Explore Drinks', true, true);
  });

  it(`O header tem os ícones corretos
    na tela de explorar comidas por ingrediente`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/foods/ingredients');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Explore Ingredients', true, true);
  });

  it(`O header tem os ícones corretos
    na tela de explorar bebidas por ingrediente`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/drinks/ingredients');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Explore Ingredients', true, true);
  });

  it(`O header tem os ícones corretos
    na tela de explorar bebidas por nacionalidades`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('./explore/foods/nationalities');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Explore Nationalities', true, true, true);
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./profile');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Profile', true, true);
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./done-recipes');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Done Recipes', true, true);
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./favorite-recipes');

    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    verify('Favorite Recipes', true, true);
  });
});

describe(`11 - Redirecione a pessoa usuária para a tela 
de perfil ao clicar no botão de perfil`, () => {
  it('Testando se o redirecionamento ocorre correntamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const profileHeader = screen.queryByTestId(/profile-top-btn/i);
    userEvent.click(profileHeader);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});

describe(`12 - Desenvolva o botão de busca que, ao ser clicado, 
a barra de busca deve aparecer. O mesmo serve para escondê-la`, () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const SearchHeader = screen.queryByTestId(/search-top-btn/i);
    userEvent.click(SearchHeader);

    const inputSearch = screen.queryByTestId(/search-input/i);
    expect(inputSearch).toBeInTheDocument();
  });
  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./foods');

    const SearchHeader = screen.queryByTestId(/search-top-btn/i);
    userEvent.click(SearchHeader);

    const inputSearch = screen.queryByTestId(/search-input/i);
    expect(inputSearch).toBeInTheDocument();

    userEvent.click(SearchHeader);
    expect(inputSearch).not.toBeInTheDocument();
  });
});
