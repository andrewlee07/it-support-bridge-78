
import { useState, useCallback } from 'react';

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/**
 * A hook for managing the open/close state of components like modals, dialogs, etc.
 * @param defaultIsOpen - The default open state
 * @returns Object with isOpen state and functions to control it
 */
export const useDisclosure = (defaultIsOpen = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, onOpen, onClose, onToggle };
};
