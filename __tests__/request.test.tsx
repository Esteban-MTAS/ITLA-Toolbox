import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useRequest } from '../src/hooks/useRequest';
test('ignores obsolete requests and aborts on unmount', async () => {
  let resolveFirst!: (v: string) => void;
  let firstSignal!: AbortSignal;
  let secondSignal!: AbortSignal;
  const { result, unmount } = await renderHook(() => useRequest<string>());
  await act(async () => {
    result.current.run(signal => {
      firstSignal = signal;
      return new Promise(resolve => {
        resolveFirst = resolve;
      });
    });
  });
  await act(async () => {
    await result.current.run(async signal => {
      secondSignal = signal;
      return 'latest';
    });
  });
  expect(firstSignal.aborted).toBe(true);
  await act(async () => {
    resolveFirst('obsolete');
  });
  expect(result.current.data).toBe('latest');
  await unmount();
  expect(secondSignal.aborted).toBe(true);
});
test('network rejection exposes a retryable error and clears loading', async () => {
  const { result } = await renderHook(() => useRequest<string>());
  await act(async () => {
    await result.current.run(async () => {
      throw new Error('Sin conexión');
    });
  });
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.error).toBe('Sin conexión');
});
