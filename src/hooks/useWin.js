import { useEffect, useState } from 'react';

export const useWin = (wordData) => {
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (isWin && !wordData.word) setIsWin(() => false);
    if (wordData?.distance === 1) setIsWin(() => true);
  }, [isWin, wordData]);

  return isWin;
};
