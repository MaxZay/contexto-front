import React from 'react';
import styles from './WinningPage.module.css';

const WinningPage = ({ gameNumber, guesses }) => {
  return (
    <div className={styles.winningPageWrapper}>
      <h3>Красава братанчик!!!</h3>
      <span>
        Ti otgadal slovo #{gameNumber} in {guesses} guesses
      </span>
    </div>
  );
};

export default WinningPage;
