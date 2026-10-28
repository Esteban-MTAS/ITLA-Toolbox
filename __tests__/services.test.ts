import { api, errorMessage, required } from '../src/services/apiClient';
import { getGender } from '../src/services/genderService';
import { getPerson } from '../src/services/randomUserService';
import { getUniversities } from '../src/services/universityService';
import { getPokemon } from '../src/services/pokemonService';
import { getWeather } from '../src/services/weatherService';
import { getPosts } from '../src/services/wordpressService';
import { plainText, dateES, weatherLabel, metric } from '../src/utils/format';

const signal = new AbortController().signal;
afterEach(() => jest.restoreAllMocks());
test('validates empty input and encodes countries', () => {
  expect(() => required('   ')).toThrow('Escribe');
  expect(required(' Dominican Republic ')).toBe('Dominican%20Republic');
});
test.each(['male', 'female', null])(
  'accepts gender result %s',
  async gender => {
    jest
      .spyOn(api, 'get')
      .mockResolvedValue({
        data: { name: 'Alex', gender, probability: gender ? 0.8 : null },
      });
    expect((await getGender('Alex', signal)).gender).toBe(gender);
  },
);
test('rejects incomplete JSON rather than exposing it to a screen', async () => {
  jest.spyOn(api, 'get').mockResolvedValue({ data: { name: 'pikachu' } });
  await expect(getPokemon('pikachu', signal)).rejects.toThrow('incompletos');
});
test('university request preserves encoding and accepts empty results', async () => {
  const spy = jest.spyOn(api, 'get').mockResolvedValue({ data: [] });
  expect(await getUniversities('Dominican Republic', signal)).toEqual([]);
  expect(spy).toHaveBeenCalledWith(
    expect.stringContaining('country=Dominican%20Republic'),
    { signal },
  );
});
test('person response extracts first record and does not request login data', async () => {
  const person = {
    name: { first: 'Ana', last: 'Test' },
    dob: { date: '2000-01-02T12:00:00Z', age: 26 },
  };
  const spy = jest
    .spyOn(api, 'get')
    .mockResolvedValue({ data: { results: [person] } });
  expect(await getPerson(signal)).toEqual(person);
  expect(spy.mock.calls[0]?.[0]).toContain('inc=name,dob,picture');
});
test('missing person fails safely', async () => {
  jest.spyOn(api, 'get').mockResolvedValue({ data: { results: [] } });
  await expect(getPerson(signal)).rejects.toThrow('incompletos');
});
test('weather uses Dominican timezone and tolerates missing optional probability', async () => {
  const data = {
    current: {
      time: '2026-10-28T10:00',
      temperature_2m: 29,
      relative_humidity_2m: 70,
      apparent_temperature: 30,
      weather_code: 2,
      wind_speed_10m: 12,
    },
    daily: {
      time: ['2026-10-28'],
      temperature_2m_max: [31],
      temperature_2m_min: [23],
    },
  };
  const spy = jest.spyOn(api, 'get').mockResolvedValue({ data });
  expect(await getWeather(signal)).toEqual(data);
  expect(spy.mock.calls[0]?.[0]).toContain('timezone=America%2FSanto_Domingo');
  expect(metric(undefined, '%')).toBe('No disponible');
});
test('WordPress requests three newest posts ordered by publication date', async () => {
  const spy = jest.spyOn(api, 'get').mockResolvedValue({ data: [] });
  await getPosts(signal);
  expect(spy.mock.calls[0]?.[0]).toContain('per_page=3');
  expect(spy.mock.calls[0]?.[0]).toContain('orderby=date&order=desc');
});
test('safe readable HTML conversion decodes entities without running markup', () => {
  expect(plainText('<p>A &amp; B &#8217;</p><script>alert(1)</script>')).toBe(
    'A & B ’',
  );
});
test('dates and weather codes have safe fallbacks', () => {
  expect(dateES('bad')).toBe('Fecha no disponible');
  expect(weatherLabel(95)[0]).toContain('Tormenta');
  expect(weatherLabel(500)[0]).toContain('no disponible');
});
test.each([
  [404, 'No se encontró'],
  [429, 'límite'],
  [503, '503'],
  [undefined, 'conexión'],
])('HTTP %s has a useful message', (status, expected) => {
  expect(
    errorMessage({
      isAxiosError: true,
      response: status ? { status } : undefined,
    }),
  ).toContain(expected);
});
