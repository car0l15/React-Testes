import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica se o card pokemon mostra essas informações', () => {
  test('testando se o componente renderiza corretamente', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(button);

    const url = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /Charmander sprite/i });

    expect(name.textContent).toBe('Charmander');
    expect(type.textContent).toBe('Fire');
    expect(weight.textContent).toBe('Average weight: 8.5 kg');
    expect(image.src).toBe(url);
  });

  test('testando se o card da pokedex mostra detalhes', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(button);

    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
  });

  test('verifica se ao clicar no link a pag é redirecionada para detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(button);

    const id = 4;
    const details = screen.getByRole('link', { name: 'More details' });
    expect(details.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(details);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
    const titleDetails = screen.getByRole('heading', {
      name: /Charmander details/i, level: 2 });
    expect(titleDetails).toBeInTheDocument();
  });

  test('verifica se existe o icone de estrelas nos pokemons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');

    const buttonCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(buttonCheck);

    const url = 'http://localhost/star-icon.svg';
    const image = screen.getByRole('img', { name: /Charmander is marked as favorite/i });
    expect(image.src).toBe(url);
  });
});
