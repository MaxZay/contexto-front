import React from 'react';
import styles from './GameInfo.module.css';

const GameInfo = ({ attempt, gameNumber }) => {
  return (
    <div className={styles.gameInfo}>
      <div className={styles.gameInfoItem}>
        <p className={styles.label}>Game:</p>
        <p className={styles.gameInfoText}>{gameNumber}</p>
      </div>
      <div className={styles.gameInfoItem}>
        <p className={styles.label}>Guesses:</p>
        <p className={styles.gameInfoText}>{attempt}</p>
      </div>
    </div>
  );
};

export default GameInfo;
