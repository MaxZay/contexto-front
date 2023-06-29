import React from 'react';
import styles from './GameNumberCard.module.css';

const GameNumberCard = ({ number, onClick }) => {
  return (
    <div className={styles.gameCardWrapper} onClick={onClick}>
      <p className={styles.gameCardNumber}>#{number}</p>
    </div>
  );
};

export default GameNumberCard;
