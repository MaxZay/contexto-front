import React from 'react';
import styles from './IconButton.module.css';

const IconButton = ({ children, ...props }) => {
  return (
    <button className={styles.iconButton} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
