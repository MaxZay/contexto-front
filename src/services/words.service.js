//const API = 'https://api.contexto.me/machado/en/game';

import { HTTP_API } from '../constants/index.js';

export const postWord = async (gameNumber, word) => {
  const json = await fetch(
    `${HTTP_API}/guesses?gameId=${gameNumber}&word=${word}`,
    {
      headers: {
        'content-Type': 'application/json',
      },
    }
  );
  return await json.json();
};

export const postWordMultiplayer = async (player, roomId, gameId, word) => {
  const json = await fetch(
    `${HTTP_API}/guesses?gameId=${gameId}&word=${word}`,
    {
      headers: {
        'content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        player: player,
        roomId: roomId,
        gameId: gameId,
        word: word,
      }),
    }
  );
  return await json.json();
};
