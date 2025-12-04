import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EditarProd } from './EditarProd';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url && url.includes('/api/productos/')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, nombre: 'ProdEdit', descripcion: 'Desc', precio: 9.9, stock: 5, imagen: '/img.png', categoria: { id: 1, nombre: 'Cat' } }) });
    }
    if (url && url.includes('/api/categorias')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1, nombre: 'Cat' }]) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
});

afterEach(() => jest.restoreAllMocks());

test('muestra los datos del producto cargado', async () => {
  // Render dentro de MemoryRouter ya que component usa useParams
  render(
    <MemoryRouter initialEntries={['/editar-producto/1']}>
      <Routes>
        <Route path="/editar-producto/:id" element={<EditarProd />} />
      </Routes>
    </MemoryRouter>
  );

  // Esperar que el input nombre tenga el valor cargado
  await waitFor(() => expect(screen.getByDisplayValue('ProdEdit')).toBeInTheDocument());
  // Esperar vista previa
  await waitFor(() => expect(screen.getByAltText(/Vista previa/i)).toBeInTheDocument());
});
