import { NextPage } from "next";
import { ModalProps } from "../../types/modal-type";
import Overlay from "./overlay";

interface IModal {
  modal: ModalProps;
  submit: () => void;
  cancel: () => void;
}

const Modal: NextPage<IModal> = ({ modal, submit, cancel }) => {
  const { message, btnText, cancelText } = modal;

  return (
    <>
      <div className="fixed bottom-1/2 left-1/2 z-50 w-80 translate-y-1/2 -translate-x-1/2 rounded-lg bg-black py-5 text-center text-white shadow-md">
        <div className="mb-4 px-5">
          {message.split(",").map((text, i) => (
            <p key={`${text}-${i}`} className="whitespace-nowrap">
              {text}
            </p>
          ))}
        </div>
        <div className="flex w-full gap-2 px-5">
          <button
            onClick={cancel}
            className="w-1/2 cursor-pointer rounded-md bg-common-black py-3 transition hover:bg-textColor-gray-100"
          >
            {cancelText ? cancelText : "취소"}
          </button>
          <button
            onClick={submit}
            className="w-1/2 cursor-pointer rounded-md bg-white py-3 text-black transition hover:bg-primary-violet"
          >
            {btnText}
          </button>
        </div>
      </div>
      <Overlay />
    </>
  );
};

export default Modal;
