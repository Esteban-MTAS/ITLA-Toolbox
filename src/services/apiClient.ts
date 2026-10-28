import axios from 'axios';
import { z } from 'zod';
export const api = axios.create({
  timeout: 20000,
  headers: { Accept: 'application/json' },
});
export async function request<T>(
  url: string,
  schema: z.ZodType<T>,
  signal: AbortSignal,
): Promise<T> {
  const response = await api.get<unknown>(url, { signal });
  const parsed = schema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error(
      'El servicio devolvió datos incompletos. Inténtalo más tarde.',
    );
  }
  return parsed.data;
}
export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return 'No se encontró el resultado solicitado.';
    }
    if (error.response?.status === 429) {
      return 'El servicio alcanzó su límite de consultas. Inténtalo más tarde.';
    }
    if (!error.response) {
      return 'No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo.';
    }
    return (
      'El servicio no está disponible (HTTP ' + error.response.status + ').'
    );
  }
  return error instanceof Error
    ? error.message
    : 'Ocurrió un error inesperado.';
}
export function required(value: string) {
  const clean = value.trim();
  if (!clean) {
    throw new Error('Escribe un valor antes de buscar.');
  }
  return encodeURIComponent(clean);
}
