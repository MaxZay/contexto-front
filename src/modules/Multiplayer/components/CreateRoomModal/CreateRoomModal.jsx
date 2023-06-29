import React, { useEffect, useState } from 'react';
import Modal from '../../../../uikit/conponents/Modal/Modal.jsx';
import Input from '../../../../uikit/conponents/Input/Input.jsx';
import { getGameNumbers } from '../../../../utils/getGameNumbers.js';
import { useRoom } from '../../../../store/useRoom.js';
import styles from './CraeteRoomModal.module.css';
import Button from '../../../../uikit/conponents/Button/Button.jsx';
import Select from '../../../../uikit/conponents/Select/Select.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../../../store/useUser.js';
import { LAST_GAME } from '../../../../constants/index.js';

const CreateRoomModal = ({ closeModal }) => {
  const [roomName, setRoomName] = useState('');
  const [selectGameId, setSelectGameId] = useState(LAST_GAME);
  const { roomId, gameLink, createRoom } = useRoom((state) => state);
  const { user } = useUser((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) navigate(`rooms/${roomId}`);
  }, [navigate, roomId]);

  const onInputChange = ({ target }) => setRoomName(() => target.value);

  const onSelectChange = ({ target }) => setSelectGameId(() => target.value);

  const onSubmit = async (event) => {
    //TODO обработать ошибки
    event.preventDefault();
    try {
      await createRoom(selectGameId, roomName, user);
    } catch (e) {
      toast('error');
    }
  };

  const onCopyButtonClick = async () => {
    await navigator.clipboard.writeText(gameLink);
  };

  return (
    <Modal
      title={'Create room'}
      closeOnBackground={true}
      scrollableContent={false}
      closeModal={closeModal}
    >
      <form className={styles.formWrapper} onSubmit={onSubmit}>
        <Input
          placeholder={'room name'}
          value={roomName}
          onChange={onInputChange}
        />
        <div className={styles.formSelect}>
          <label htmlFor={'roomIdSelect'}>Game id</label>
          <Select
            id={'roomIdSelect'}
            placeholder={'room name'}
            value={selectGameId}
            onChange={onSelectChange}
            options={getGameNumbers()}
          />
        </div>
        <div className={styles.formActions}>
          <Button type={'submit'}>Create</Button>
          {/*<Button disabled={!gameLink} onClick={onCopyButtonClick}>*/}
          {/*  Copy link*/}
          {/*</Button>*/}
        </div>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
