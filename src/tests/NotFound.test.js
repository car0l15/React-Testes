import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('verifica se o titulo de page requested not found 😭 é renderizado', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('heading', { level: 2,
      name: /Page requested not found /i });
    expect(notFound).toBeInTheDocument();
  });

  test('se página mostra renderiza a seguinte imagem', () => {
    renderWithRouter(<NotFound />);

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(image.src).toBe(url);
  });
});
