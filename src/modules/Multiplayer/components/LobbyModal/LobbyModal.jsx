import React from 'react';
import styles from './LobbyModal.module.css';
import Modal from '../../../../uikit/conponents/Modal/Modal.jsx';
import { useRoom } from '../../../../store/useRoom.js';
import Input from '../../../../uikit/conponents/Input/Input.jsx';
import Button from '../../../../uikit/conponents/Button/Button.jsx';
import { useUser } from '../../../../store/useUser.js';
import { toast } from 'react-toastify';

const LobbyModal = ({ closeModal, onGameStarted }) => {
  const { roomName, creator, gameLink } = useRoom((state) => state);
  const { user } = useUser((state) => state);

  const onCopyButtonClick = async () => {
    await navigator.clipboard.writeText(gameLink);
    toast.success('copied');
  };

  return (
    <Modal
      closeOnBackground={false}
      closeModal={closeModal}
      title={`Lobby ${roomName}`}
      scrollableContent={false}
      disable
    >
      <div className={styles.lobbyModalWrapper}>
        <Input value={gameLink} disabled />
        <div className={styles.lobbyButtons}>
          {creator.id === user.id && (
            <Button onClick={onGameStarted}>Start</Button>
          )}
          <Button onClick={onCopyButtonClick}>Copy</Button>
        </div>
      </div>
    </Modal>
  );
};

export default LobbyModal;
