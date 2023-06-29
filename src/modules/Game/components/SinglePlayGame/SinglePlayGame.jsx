import React from 'react';
import Game from '../Game/Game.jsx';
import { useGame } from '../../../../store/useGame.js';

const SinglePlayGame = () => {
  const { addWord } = useGame((state) => state);

  return <Game addWord={addWord} />;
};

export default SinglePlayGame;
