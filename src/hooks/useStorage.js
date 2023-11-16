import { useState, useEffect } from 'react';

export default function useStorage(key, initValue, storageObject) {
  const [value, setValue] = useState(
    JSON.parse(storageObject.getItem(key)) ?? initValue,
  );

  useEffect(() => {
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue];
}
