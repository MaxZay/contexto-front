import { HTTP_API } from '../constants/index.js';

export const createRoom = async (gameId, roomName, userInfo) => {
  const json = await fetch(`${HTTP_API}/rooms`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ name: roomName, gameId: gameId, creator: userInfo }),
  });
  return await json.json();
};

export const getRoom = async (roomId, userInfo) => {
  const json = await fetch(`${HTTP_API}/rooms/${roomId}`, {
    method: 'PATCH',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  return await json.json();
};
