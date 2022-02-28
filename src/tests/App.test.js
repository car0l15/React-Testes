import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('verifica se as rotas contidas em app functionam', () => {
  test('verifica se os links estão na pagina inicial', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', {
      name: /about/i });
    const favoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('verifica se o link home é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('verifica se ao clicar no link redireciona para about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('verifica se o link redireciona para favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('verifica se ao não encontrar um link, a pag redireciona para not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
