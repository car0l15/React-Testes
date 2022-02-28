import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente FavoritePokemons', () => {
  test('verifica se a mensagem no favorite pokemon é renderizada', () => {
    renderWithRouter(<FavoritePokemons />);

    const mensagem = screen.getByText('No favorite pokemon found');
    expect(mensagem).toBeInTheDocument();
  });

  test('verifica se os cards de pokemons favoritos são renderizados', () => {
    renderWithRouter(<App />);
    const moreDetailButton = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetailButton);
    const favoriteButton = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteButton);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritePokemons);
    screen.logTestingPlaygroundURL();
    const pokemonCard = screen.getByText(/pikachu/i);
    expect(pokemonCard).toBeInTheDocument();
  });
});
