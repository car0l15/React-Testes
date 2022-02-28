import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('verifica se o componente about renderiza corretamente', () => {
  test('Testa se a pag renderiza o texto correto', () => {
    renderWithRouter(<About />);

    const title = screen.getByText('About Pokédex');

    expect(title).toBeInTheDocument();
  });

  test('Testando se a pag contém o h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleAbout = screen
      .getByRole('heading', { name: /About Pokédex/i }, { level: 2 });
    expect(titleAbout).toBeInTheDocument();
  });

  test('Testando se a pag tem dois paragrafos de texto sobre as Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';

    const secondParagraph = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';

    const checkP1 = screen.getByText(firstParagraph);
    const checkP2 = screen.getByText(secondParagraph);

    expect(checkP1 && checkP2).toBeInTheDocument();
  });

  test('Testando se a pag tem a seguinte imagem', () => {
    renderWithRouter(<About />);

    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imagePokedex = screen.getByRole('img');

    expect(imagePokedex).toHaveAttribute('src', srcImage);
  });
});
