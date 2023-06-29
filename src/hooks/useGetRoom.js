import { useEffect, useState } from 'react';
import { useRoom } from '../store/useRoom.js';

export const useGetRoom = (userInfo, roomId) => {
  const { getRoom } = useRoom((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(() => true);
      await getRoom(roomId, userInfo);
      setIsLoading(() => false);
    };

    fetchData().catch((e) => console.log(e));
  }, [getRoom, roomId, userInfo]);

  return isLoading;
};
