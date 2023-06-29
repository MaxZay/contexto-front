import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useGameMode = () => {
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const id = useParams();

  console.log(id);
  //
  // useEffect(() => {
  //   if (id) setIsSinglePlayer(() => false);
  // }, [id]);

  return isSinglePlayer;
};
