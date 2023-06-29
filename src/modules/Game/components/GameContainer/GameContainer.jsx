import React from 'react';
import styles from './GameContainer.module.css';

const GameContainer = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default GameContainer;
