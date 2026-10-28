import { request, required } from './apiClient';
import { PokemonSchema } from '../types/api';
export const getPokemon = (name: string, signal: AbortSignal) =>
  request(
    'https://pokeapi.co/api/v2/pokemon/' + required(name.toLowerCase()),
    PokemonSchema,
    signal,
  );
