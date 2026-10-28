import { request } from './apiClient';
import { PersonSchema } from '../types/api';
export async function getPerson(signal: AbortSignal) {
  const data = await request(
    'https://randomuser.me/api/?results=1&inc=name,dob,picture&noinfo&nonce=' +
      Date.now(),
    PersonSchema,
    signal,
  );
  return data.results[0]!;
}
