import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Productos } from './Productos';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, nombre: 'Manzana', descripcion: 'Fruta', precio: 5, stock: 10, estado: true, categoria: { nombre: 'Frutas' } },
        { id: 2, nombre: 'Leche', descripcion: 'Lacteo', precio: 3, stock: 5, estado: true, categoria: { nombre: 'Lacteos' } },
      ]),
    })
  );
});

afterEach(() => jest.restoreAllMocks());

test('muestra la tabla y filtra por texto', async () => {
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  // Espera a que la fila con Manzana aparezca
  await waitFor(() => expect(screen.getByText('Manzana')).toBeInTheDocument());

  const input = screen.getByPlaceholderText(/Buscar por nombre o categoría/i);
  await userEvent.type(input, 'Leche');

  expect(screen.queryByText('Manzana')).not.toBeInTheDocument();
  expect(screen.getByText('Leche')).toBeInTheDocument();
});
