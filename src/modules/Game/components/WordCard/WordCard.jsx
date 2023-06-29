import React from 'react';
import styles from './WordCard.module.css';
import { useDebounce } from '../../../../hooks/useDebounce.js';
const WordCard = ({ word, distance, active }) => {
  const color = distance <= 300 ? 'green' : distance <= 1500 ? 'orange' : 'red';
  const debouncedWidth = useDebounce(
    distance > 3000 ? 2 : 100 - (distance * 100) / 3000,
    50
  );

  return (
    <div className={`${styles.wordCard} ${active ? styles.border : ''}`}>
      <div
        className={`${styles.cardColor} ${styles[color]}`}
        style={{ width: `${debouncedWidth}%` }}
      />
      <span>{word}</span>
      <span>{distance}</span>
    </div>
  );
};

export default WordCard;
