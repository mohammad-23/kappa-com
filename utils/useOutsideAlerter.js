import { useState, useEffect } from "react";

const useOutsideAlerter = (ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen]);

  return {
    isOpen,
    setIsOpen,
  };
};

export default useOutsideAlerter;
