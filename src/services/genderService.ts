import { request, required } from './apiClient';
import { GenderSchema } from '../types/api';
export const getGender = (name: string, signal: AbortSignal) =>
  request(
    'https://api.genderize.io/?name=' + required(name),
    GenderSchema,
    signal,
  );
