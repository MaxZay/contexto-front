import React from 'react';
import styles from './Title.module.css';
import ContextMenuButton from '../../../../uikit/conponents/MenuButton/ContextMenuButton.jsx';
import { Link } from 'react-router-dom';

const Title = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.title} to={'/'}>
        <h1>Contexto</h1>
      </Link>
      <ContextMenuButton />
    </header>
  );
};

export default Title;
