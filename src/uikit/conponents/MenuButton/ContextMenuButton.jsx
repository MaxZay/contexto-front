import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import IconMoreButton from '../IconMoreButton/IconMoreButton.jsx';
import '@szhsin/react-menu/dist/index.css';
import styles from './ContextMenuButton.module.css';
import { useModal } from '../../../hooks/useModal.js';
import SelectGameNumberModal from '../../../modules/Game/components/SelectGameNumberModal/SelectGameNumberModal.jsx';
import { createPortal } from 'react-dom';
import CreateRoomModal from '../../../modules/Multiplayer/components/CreateRoomModal/CreateRoomModal.jsx';
import { useRoom } from '../../../store/useRoom.js';

const ContextMenuButton = () => {
  const {
    isModalOpen: isSelectGameModalOpen,
    closeModal: closeSelectGameModalOpen,
    openModal: openSelectGameModalOpen,
  } = useModal(false);
  const {
    isModalOpen: isCreateRoomModalOpen,
    closeModal: closeCreateRoomModalOpen,
    openModal: openCreateRoomModalOpen,
  } = useModal(false);
  const { clearRoom } = useRoom((state) => state);

  const menuItemClassName = ({ hover }) =>
    hover ? styles.menuItemHover : styles.menuItem;

  const onMenuButtonClick = () => openSelectGameModalOpen();

  const onCreateRoomButtonClick = () => {
    clearRoom();
    openCreateRoomModalOpen();
  };

  return (
    <>
      <Menu
        menuClassName={styles.menu}
        menuButton={
          <MenuButton className={styles.menuButton}>
            <IconMoreButton />
          </MenuButton>
        }
      >
        <MenuItem className={menuItemClassName} onClick={onMenuButtonClick}>
          Previous games
        </MenuItem>
        <MenuItem
          className={menuItemClassName}
          onClick={onCreateRoomButtonClick}
        >
          Create room
        </MenuItem>
      </Menu>
      {isSelectGameModalOpen &&
        createPortal(
          <SelectGameNumberModal closeModal={closeSelectGameModalOpen} />,
          document.body
        )}
      {isCreateRoomModalOpen &&
        createPortal(
          <CreateRoomModal closeModal={closeCreateRoomModalOpen} />,
          document.body
        )}
    </>
  );
};

export default ContextMenuButton;
