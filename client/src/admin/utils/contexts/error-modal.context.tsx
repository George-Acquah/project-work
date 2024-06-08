// contexts/ErrorModalContext.js
import { createContext, useContext, useState } from "react";

const ErrorModalContext = createContext<_IErrorModalContext>({
  message: undefined,
  visible: false,
  button_label: undefined,
  description: undefined,
  openErrorModal() {},
  closeErrorModal() {},
});

export const useErrorModal = () => useContext(ErrorModalContext);

export const ErrorModalProvider = ({ children }: _IChildren) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [button_label, setButtonLabel] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const openErrorModal = (data: _IShowErrorModal) => {
    setMessage(data.message);
    setVisible(true);
    setDescription(data.description);
    setButtonLabel(data.button_label)
  };
  const closeErrorModal = () => {
    setMessage(undefined);
    setVisible(false);
    setDescription(undefined);
    setButtonLabel(undefined);
  };

  return (
    <ErrorModalContext.Provider
      value={{
        message,
        visible,
        description,
        button_label,
        openErrorModal,
        closeErrorModal,
      }}
    >
      {children}
    </ErrorModalContext.Provider>
  );
};
