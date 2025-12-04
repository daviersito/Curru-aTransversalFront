import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CrearProducto } from './CrearProducto';

beforeEach(() => {
  // mock categorias fetch
  global.fetch = jest.fn((url) => {
    if (url && url.includes('/api/categorias')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1, nombre: 'Cat A' }]) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
  });
});

afterEach(() => jest.restoreAllMocks());

test('validación habilita el botón cuando los campos obligatorios están completos', async () => {
  render(
    <MemoryRouter>
      <CrearProducto />
    </MemoryRouter>
  );

  // esperar que el select de categorias se renderice
  await waitFor(() => expect(screen.getByText(/Selecciona una categoría/i)).toBeInTheDocument());

  const nombre = screen.getByPlaceholderText(/Nombre/i);
  const descripcion = screen.getByPlaceholderText(/Descripción/i);
  const precio = screen.getByPlaceholderText(/Precio/i);
  const select = screen.getByRole('combobox');
  await userEvent.type(nombre, 'Nuevo');
  await userEvent.type(descripcion, 'Desc');
  await userEvent.clear(precio);
  await userEvent.type(precio, '10');
  // seleccionar categoria
  await userEvent.selectOptions(select, '1');

  // subir archivo
  const file = new File(['dummy'], 'photo.png', { type: 'image/png' });
  const upload = document.querySelector('input[type="file"]');
  if (upload) await userEvent.upload(upload, file);

  // Esperar que el botón deje de estar deshabilitado
  await waitFor(() => expect(screen.getByRole('button', { name: /Guardar producto/i })).not.toBeDisabled());
});
