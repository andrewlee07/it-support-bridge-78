
import { useState } from 'react';

export const useDialog = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, onToggle };
};
