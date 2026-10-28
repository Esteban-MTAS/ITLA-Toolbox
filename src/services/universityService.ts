import { request, required } from './apiClient';
import { UniversitiesSchema } from '../types/api';
export const getUniversities = (country: string, signal: AbortSignal) =>
  request(
    'https://adamix.net/proxy.php?country=' + required(country),
    UniversitiesSchema,
    signal,
  );
