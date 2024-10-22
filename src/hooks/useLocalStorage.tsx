import { useState, useCallback } from "react";

const getItemFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const setItemToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() =>
    getItemFromLocalStorage(key, defaultValue)
  );

  const setLocalStorageState = useCallback(
    (newValue: T) => {
      setState(newValue);
      setItemToLocalStorage(key, newValue);
    },
    [key]
  );

  return [state, setLocalStorageState] as const;
};
