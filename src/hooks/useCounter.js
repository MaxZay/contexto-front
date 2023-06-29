import { useState } from 'react';

export const useCounter = (initialValue) => {
  const [counter, setCounter] = useState(initialValue);

  const inc = () => setCounter((prev) => prev + 1);

  const dec = () => setCounter((prev) => prev - 1);

  return { inc, dec, counter };
};
