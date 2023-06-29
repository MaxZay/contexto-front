import React, { useMemo } from 'react';
import Modal from '../../../../uikit/conponents/Modal/Modal.jsx';
import { getGameNumbers } from '../../../../utils/getGameNumbers.js';
import GameNumberCard from '../GameNumberCard/GameNumberCard.jsx';
import styles from './SelectGameNumberModal.module.css';
import { useGame } from '../../../../store/useGame.js';

const SelectGameNumberModal = ({ closeModal }) => {
  const { setGameNumber, clearGame } = useGame((state) => state);
  const gameNumbers = useMemo(() => getGameNumbers(), []);

  const gameCardClickHandler = (number) => {
    setGameNumber(number);
    clearGame();
    closeModal();
  };

  return (
    <Modal
      closeModal={closeModal}
      title={'Select a previous game to play:'}
      closeOnBackground
    >
      <div className={styles.gameNumberListWrapper}>
        {gameNumbers &&
          gameNumbers.map((number) => (
            <GameNumberCard
              key={number}
              number={number}
              onClick={() => gameCardClickHandler(number)}
            />
          ))}
      </div>
    </Modal>
  );
};

export default SelectGameNumberModal;
