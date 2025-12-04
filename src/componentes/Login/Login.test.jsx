import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

import { Login } from './Login';

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  window.localStorage.__proto__.setItem = jest.fn();
});

afterEach(() => jest.restoreAllMocks());

test('valida campos obligatorios y muestra error', async () => {
  render(<Login />);

  // submit vacío
  const btn = screen.getByRole('button', { name: /Ingresar/i });
  await userEvent.click(btn);

  expect(await screen.findByText(/El email es obligatorio|Email o contraseña incorrectos/i)).toBeInTheDocument();
});

test('login exitoso guarda en localStorage y redirige', async () => {
  // mock fetch para login
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 9, nombre: 'Admin', rol: 'admin' }) }));

  render(<Login />);

  const email = document.querySelector('input[name="email"]');
  const pass = document.querySelector('input[name="contra"]');
  await userEvent.type(email, 'a@b.com');
  await userEvent.type(pass, 'password');

  const btn = screen.getByRole('button', { name: /Ingresar/i });
  await userEvent.click(btn);

  await waitFor(() => expect(window.localStorage.setItem).toHaveBeenCalled());
  expect(mockNavigate).toHaveBeenCalled();
});
