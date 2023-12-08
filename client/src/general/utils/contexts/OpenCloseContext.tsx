'use client'
import React, { createContext, useCallback, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const OpenCloseContext = createContext<_IOpenCloseContext>({
  isOpen: false,
  activeAccordion: null,
  setIsOpen: () => {},
  setClose: () => {},
  setOpen: () => {},
  handleOpenClose: () => { },
  handleClick: () => { },
  handleToggle: () => {},
});

export const OpenCloseProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const setOpen = () => setIsOpen(true);
  const setClose = () => setIsOpen(false);

  const handleOpenClose = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

    const handleClick = (idx: any) => {
      setActiveAccordion(activeAccordion === idx ? null : idx);
    };

    const handleToggle = (idx: any) => {
      return activeAccordion === idx
        ? `max-height: ${document.getElementById(`tab-${idx}`)?.scrollHeight}px`
        : "";
    };


  return (
    <OpenCloseContext.Provider
      value={{
        isOpen,
        activeAccordion,
        setIsOpen,
        setOpen,
        setClose,
        handleOpenClose,
        handleClick,
        handleToggle,
      }}
    >
      {children}
    </OpenCloseContext.Provider>
  );
};

export default OpenCloseProvider; 
