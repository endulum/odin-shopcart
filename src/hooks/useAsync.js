import { useCallback, useState, useEffect } from 'react';

export default function useAsync(callback, deps = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(null);
    setValue(null);

    callback().then(setValue).catch(setError).finally(() => setLoading(false));
  }, deps);

  useEffect(() => callbackMemoized(), [callbackMemoized]);

  return [loading, error, value];
}
