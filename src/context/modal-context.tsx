import React, { createContext, useCallback, useState } from "react";

import Modal from "../components/ui/modal";

import { ModalProps } from "../types/modal-type";

const modalContext = createContext({
  modal: <></>,
  show: false,
  setModalState: (props: ModalProps) => {},
  showModal: (status: boolean) => {},
});

const modalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    message: "",
    btnText: "",
    cancelFn: null,
    submitFn: null,
  });

  const showModal = (status: boolean) => setShow(status);

  const setModalState = useCallback(
    ({ message, btnText, cancelFn, submitFn }: ModalProps) => {
      setModal({ message, btnText, cancelFn, submitFn });
      setShow(true);
    },
    [],
  );

  const cancel = () => {
    if (modal.cancelFn) modal.cancelFn();
    setShow(false);
  };

  const submit = () => {
    if (modal.submitFn) modal.submitFn();
    setShow(false);
  };

  const value = {
    modal: <Modal modal={modal} submit={submit} cancel={cancel} />,
    show,
    setModalState,
    showModal,
  };

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
};

export default modalContextProvider;
