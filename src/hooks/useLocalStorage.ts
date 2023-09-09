import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const lsItem = window.localStorage.getItem(key);
    return lsItem ? (JSON.parse(lsItem) as T) : initValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
