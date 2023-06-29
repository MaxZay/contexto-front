import React, { useState } from 'react';
import styles from './WordForm.module.css';
import Input from '../../../../uikit/conponents/Input/Input.jsx';

const WordForm = ({ word, setWord, submitHandler, isWin }) => {
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={submitHandler}>
        <Input
          name={'word'}
          autoComplete={'off'}
          autoCapitalize={'off'}
          value={word}
          disabled={isWin}
          placeholder={'type a word'}
          onChange={setWord}
        />
      </form>
    </div>
  );
};

export default WordForm;
