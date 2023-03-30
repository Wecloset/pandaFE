import React, { useCallback, useState } from "react";

interface ModalProps {
  message: string;
  btnText: string;
  cancel?: ((param?: any) => void) | null;
  submit?: ((param?: any) => void) | null;
}

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    message: "",
    btnText: "",
    cancel: null,
    submit: null,
  });

  const showModal = (status: boolean) => {
    setShow(status);
  };

  const setModalState = useCallback(
    ({ message, cancel, submit, btnText }: ModalProps) => {
      setModal({ message, btnText, cancel, submit });
      setShow(true);
    },
    [],
  );

  const cancel = () => {
    if (modal.cancel) modal.cancel();
    setShow(false);
  };

  const submit = () => {
    if (modal.submit) modal.submit();
    setShow(false);
  };

  const Modal = () => {
    return (
      <div className="fixed top-1/2 z-50 w-64 translate-x-[70px] -translate-y-1/2 rounded-lg bg-black py-5 text-center text-white shadow-md">
        <div className="mb-4">
          {modal.message.split(",").map((text, i) => (
            <p key={`${text}-${i}`}>{text}</p>
          ))}
        </div>
        <div className="flex w-full gap-2 px-5">
          <button
            onClick={cancel}
            className="w-1/2 cursor-pointer rounded-md bg-common-black py-3 transition hover:bg-textColor-gray-100"
          >
            취소
          </button>
          <button
            onClick={submit}
            className="w-1/2 cursor-pointer rounded-md bg-white py-3 text-black transition hover:bg-primary-violet"
          >
            {modal.btnText}
          </button>
        </div>
      </div>
    );
  };

  return { Modal, setModalState, show, showModal };
};

export default useModal;
