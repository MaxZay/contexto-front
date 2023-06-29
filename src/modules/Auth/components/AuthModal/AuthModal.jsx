import React, { useState } from 'react';
import Modal from '../../../../uikit/conponents/Modal/Modal.jsx';
import Input from '../../../../uikit/conponents/Input/Input.jsx';
import styles from './AuthModal.module.css';
import { useUser } from '../../../../store/useUser.js';

const AuthModal = ({ closeModal }) => {
  const [username, setUserName] = useState('');
  const { user, auth } = useUser((state) => state);

  const onUsernameChange = ({ target }) => setUserName(() => target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    await auth(username);
    if (user) closeModal();
  };

  return (
    <Modal
      title={'Authentication'}
      closeModal={closeModal}
      closeOnBackground={false}
      scrollableContent={false}
      closeButton={false}
    >
      <form className={styles.formWrapper} onSubmit={onSubmit}>
        <Input
          placeholder={'username'}
          onChange={onUsernameChange}
          value={username}
          autoComplete={'off'}
          autoCapitalize={'off'}
        />
        <button className={styles.logInButton}>Log in</button>
      </form>
    </Modal>
  );
};

export default AuthModal;
