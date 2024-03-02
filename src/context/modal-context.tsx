import React, { createContext, useState } from "react";

import { ModalProps } from "../types/modal-type";

export const modalContext = createContext({
  show: false,
  modal: {},
  cancel: () => {},
  submit: () => {},
  setModalState: (props: ModalProps) => {},
  openModal: (status: boolean) => {},
});

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    message: "",
    btnText: "",
    cancelText: "",
    cancelFn: null,
    submitFn: null,
  });

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  const setModalState = ({
    message,
    btnText,
    cancelText,
    cancelFn,
    submitFn,
  }: ModalProps) => {
    setModal({ message, btnText, cancelText, cancelFn, submitFn });
    openModal();
  };

  const cancel = () => {
    if (modal.cancelFn) modal.cancelFn();
    closeModal();
  };

  const submit = () => {
    if (modal.submitFn) modal.submitFn();
    closeModal();
  };

  const value = {
    show,
    modal,
    cancel,
    submit,
    setModalState,
    openModal,
  };

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
};

export default ModalContextProvider;
