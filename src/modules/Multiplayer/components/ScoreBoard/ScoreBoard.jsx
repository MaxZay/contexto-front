import React from 'react';
import { useRoom } from '../../../../store/useRoom.js';
import styles from './ScoreBoard.module.css';

const ScoreBoard = () => {
  const { players } = useRoom((state) => state);

  return (
    <div className={styles.scoreBoard}>
      <h3>Scoreboard</h3>
      <div className={styles.playersList}>
        {players.map((player) => (
          <div className={styles.playerCard} key={player.id}>
            <p>{player.nickName}</p>
            <p>{player.distance ? player.distance : '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
