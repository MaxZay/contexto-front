import React from 'react';
import styles from './Modal.module.css';
import IconButton from '../IconButton/IconButton.jsx';
import CrossIcon from '../CrossIcon/CrossIcon.jsx';

const Modal = ({
  closeModal,
  title,
  children,
  closeOnBackground,
  scrollableContent = true,
  closeButton = true,
}) => {
  return (
    <>
      <div
        className={styles.darkBG}
        onClick={closeOnBackground ? () => closeModal() : () => {}}
      ></div>
      <div className={styles.centered}>
        <div className={styles.modal}>
          {closeButton && (
            <div className={styles.closeButton}>
              <IconButton onClick={closeModal}>
                <CrossIcon />
              </IconButton>
            </div>
          )}
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <div
            className={
              scrollableContent
                ? styles.scrollableContentWrapper
                : styles.contentWrapper
            }
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
