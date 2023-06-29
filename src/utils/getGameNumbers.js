import { LAST_GAME } from '../constants/index.js';

export const getGameNumbers = () => {
  let result = [];
  for (let i = LAST_GAME; i > 0; i--) {
    result.push(i);
  }
  return result;
};
