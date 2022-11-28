import React, { useEffect, useState } from 'react';

const storage = {
  getItem<Item>(key: string, initValue: Item) {
    try {
      const unparsedValue = localStorage[key];
      if (typeof unparsedValue === 'undefined') {
        return initValue;
      }
      return JSON.parse(unparsedValue);
    } catch (_e) {
      return initValue;
    }
  },
  setItem<Item>(key: string, newValue: Item) {
    localStorage[key] = JSON.stringify(newValue);
  },
};

export default function useLocalStorage<Data>(
  key: string,
  initData: Data
): [Data, React.Dispatch<React.SetStateAction<Data>>] {
  const [value, setValue] = useState<Data>(initData);

  const setLocalStorage = (initialState: React.SetStateAction<Data>) => {
    const data =
      initialState instanceof Function ? initialState(value) : initialState;
    setValue(initialState);
    storage.setItem<Data>(key, data);
  };

  useEffect(() => {
    setLocalStorage(storage.getItem<Data>(key, initData));
  }, []);

  return [value, setLocalStorage];
}
