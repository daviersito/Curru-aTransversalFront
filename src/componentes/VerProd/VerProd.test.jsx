import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { VerProd } from './VerProd';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, nombre: 'Prod A', descripcion: 'Desc', precio: 10, estado: true, imagen: null },
        { id: 2, nombre: 'Prod B', descripcion: 'Desc B', precio: 20, estado: false, imagen: null },
      ]),
    })
  );
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('muestra productos activos y botón agregar', async () => {
  render(<VerProd />);

  // espera que el título y el producto activo aparezcan
  expect(await screen.findByText(/Nuestros Productos/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Prod A')).toBeInTheDocument());

  // botón agregar aparece
  const btn = screen.getByRole('button', { name: /Agregar al carrito/i });
  expect(btn).toBeInTheDocument();
});
