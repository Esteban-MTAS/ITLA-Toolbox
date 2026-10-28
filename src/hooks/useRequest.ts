import { useCallback, useEffect, useRef, useState } from 'react';
import { errorMessage } from '../services/apiClient';
export function useRequest<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => active.current?.abort(), []);
  const run = useCallback(async (task: (signal: AbortSignal) => Promise<T>) => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await task(controller.signal);
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (e) {
      if (!controller.signal.aborted) {
        setError(errorMessage(e));
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);
  return { data, loading, error, run };
}
