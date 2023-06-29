import { useEffect, useState } from 'react';

export const useModal = (initialValue) => {
  const [isModalOpen, setIsModalOpen] = useState(initialValue);

  const openModal = () => setIsModalOpen(() => true);
  const closeModal = () => setIsModalOpen(() => false);

  return { isModalOpen, closeModal, openModal };
};
