// contexts/SessionModalContext.js
import { createContext, useContext, useState } from "react";

const SessionModalContext = createContext<_ISessionContext>({
  isSessionModalOpen: false,
  callbackUrl: undefined,
  openSessionModal() {},
  closeSessionModal() {},
});

export const useSessionModal = () => useContext(SessionModalContext);

export const SessionProvider = ({ children }: _IChildren) => {
  const [isSessionModalOpen, setSessionModalOpen] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState<string | undefined>(undefined);
  console.log(isSessionModalOpen);

  const openSessionModal = (callbackUrl?: string) => {
    setSessionModalOpen(true);
    setCallbackUrl(callbackUrl ?? undefined);

  };
  const closeSessionModal = () => {
    console.log('hiiiiiiiiiiiiiit')
    setSessionModalOpen(false);
    setCallbackUrl(undefined);
  };

  return (
    <SessionModalContext.Provider
      value={{
        isSessionModalOpen,
        callbackUrl,
        openSessionModal,
        closeSessionModal,
      }}
    >
      {children}
    </SessionModalContext.Provider>
  );
};
