import { RefObject, useEffect } from 'react';

interface UseClickOutsideProps {
  isOpen: boolean;
  onClose: () => void;
  refs: Array<RefObject<HTMLElement | null>>;
}

const useClickOutside = ({ isOpen, onClose, refs }: UseClickOutsideProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Checks if the click is outside all referenced elements
      const isClickOutside = refs.every(
        (ref) => !ref.current || !ref.current.contains(event.target as Node),
      );

      if (isClickOutside) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, refs]);
};

export default useClickOutside;
