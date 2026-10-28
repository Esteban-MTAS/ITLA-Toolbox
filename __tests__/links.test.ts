import { Alert, Linking } from 'react-native';
import { openLink } from '../src/utils/links';
afterEach(() => jest.restoreAllMocks());
test('opens real web and contact links', async () => {
  const spy = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
  await openLink('https://itla.edu.do/');
  await openLink('mailto:example@example.org');
  expect(spy).toHaveBeenCalledTimes(2);
});
test('blocks unsafe schemes', async () => {
  const spy = jest.spyOn(Linking, 'openURL');
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  // eslint-disable-next-line no-script-url -- deliberately malicious input under test
  await openLink('javascript:alert(1)');
  expect(spy).not.toHaveBeenCalled();
});
test('handles missing external applications', async () => {
  jest.spyOn(Linking, 'openURL').mockRejectedValue(new Error('No handler'));
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await openLink('https://itla.edu.do/');
  expect(alert).toHaveBeenCalledWith('No se pudo abrir', expect.any(String));
});
