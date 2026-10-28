/**
 * @format
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { modules } from '../src/navigation/routes';
import { api } from '../src/services/apiClient';
const headings = {
  Gender: 'Un nombre, una estimación',
  RandomUser: 'Conoce un nuevo perfil',
  Universities: 'Tu próximo destino',
  Weather: 'Santo Domingo',
  Pokemon: 'Encuentra tu Pokémon',
  News: 'WordPress News',
  About: 'Construyendo soluciones',
};

test.each(modules)('navigates from Home to $route', async module => {
  jest.spyOn(api, 'get').mockRejectedValue(new Error('Sin conexión de prueba'));
  const ui = await render(<App />);
  await fireEvent.press(ui.getByRole('button', { name: module.title }));
  await waitFor(() =>
    expect(ui.getByText(headings[module.route])).toBeTruthy(),
  );
  await ui.unmount();
  jest.restoreAllMocks();
});
