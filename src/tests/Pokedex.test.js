import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando as funcionalidades da pokedex', () => {
  test('verifica se o h2 correto é renderizado', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('verificando se o botão do próximo pokemon funciona normalmente', () => {
    renderWithRouter(<App />);
    const firstType = screen.getAllByText(/electric/i)[0];
    expect(firstType).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);
    const secondType = screen.getAllByText(/fire/i)[0];
    expect(secondType).toBeInTheDocument();

    userEvent.click(nextButton);
    const thirdType = screen.getAllByText(/bug/i)[0];
    expect(thirdType).toBeInTheDocument();

    userEvent.click(nextButton);
    const fourthType = screen.getAllByText(/poison/i)[0];
    expect(fourthType).toBeInTheDocument();

    const max = 5;
    for (let i = 0; i <= max; i += 1) {
      userEvent.click(nextButton);
    }
    const pikachuCard = screen.getByText(/pikachu/i);
    expect(pikachuCard).toBeInTheDocument();
  });

  test('verifica se apenas um pokemon é renderizado', () => {
    renderWithRouter(<App />);
    const moreDetailButton = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(moreDetailButton.length).toBe(1);
  });

  test('testando os botões e filtros', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const lastButtonIndex = 7;

    const types = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(buttons.length).toBe(lastButtonIndex);

    buttons.forEach((type, index) => {
      expect(type.innerHTML).toBe(types[index]);

      userEvent.click(type);
      const allButton = screen.getByRole('button', {
        name: /all/i,
      });
      expect(allButton).toBeInTheDocument();
      userEvent.click(allButton);
      const pikachuCard = screen.getByText(/pikachu/i);
      expect(pikachuCard).toBeInTheDocument();
    });
  });
});

// ajuda de André e Yasmim turma xp A, agradeço muito
