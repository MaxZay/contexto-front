import { HTTP_API } from '../constants/index.js';

export const auth = async (username) => {
  const json = await fetch(`${HTTP_API}/players`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ nickName: username }),
  });
  return await json.json();
};
