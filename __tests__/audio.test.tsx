import { act, renderHook } from '@testing-library/react-native';
import Sound from 'react-native-sound';
import { usePokemonSound } from '../src/hooks/usePokemonSound';
jest.mock('@react-navigation/native', () => ({ useFocusEffect: jest.fn() }));
const ctor = Sound as unknown as jest.Mock;
test('loads remote audio, plays after loading, and releases after completion', async () => {
  let loaded!: (error?: Error) => void;
  let completed!: (success: boolean) => void;
  const release = jest.fn();
  const play = jest.fn(cb => {
    completed = cb;
  });
  ctor.mockImplementation((_url, _base, cb) => {
    loaded = cb;
    return { play, release };
  });
  const { result, unmount } = await renderHook(() =>
    usePokemonSound('https://example.org/cry.ogg'),
  );
  await act(async () => result.current.play());
  expect(ctor).toHaveBeenCalledWith(
    'https://example.org/cry.ogg',
    '',
    expect.any(Function),
  );
  await act(async () => loaded());
  expect(play).toHaveBeenCalledTimes(1);
  await act(async () => completed(true));
  expect(result.current.playing).toBe(false);
  expect(release).toHaveBeenCalled();
  await unmount();
});
test('changing Pokémon prevents a late audio load from playing', async () => {
  let loaded!: (error?: Error) => void;
  const play = jest.fn();
  const release = jest.fn();
  ctor.mockImplementation((_url, _base, cb) => {
    loaded = cb;
    return { play, release };
  });
  const { result, rerender, unmount } = await renderHook(
    ({ url }: {url: string}) => usePokemonSound(url),
    { initialProps: { url: 'https://example.org/first.ogg' } },
  );
  await act(async () => result.current.play());
  await rerender({ url: 'https://example.org/second.ogg' });
  await act(async () => loaded());
  expect(play).not.toHaveBeenCalled();
  expect(release).toHaveBeenCalled();
  await unmount();
});
test('audio load error is visible and releases native resources', async () => {
  let loaded!: (error?: Error) => void;
  const release = jest.fn();
  ctor.mockImplementation((_url, _base, cb) => {
    loaded = cb;
    return { play: jest.fn(), release };
  });
  const { result, unmount } = await renderHook(() =>
    usePokemonSound('https://example.org/cry.ogg'),
  );
  await act(async () => result.current.play());
  await act(async () => loaded(new Error('Offline')));
  expect(result.current.error).toContain('No se pudo cargar');
  expect(release).toHaveBeenCalled();
  await unmount();
});
