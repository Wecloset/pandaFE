import { NextPage } from "next";
import { ModalProps } from "../../types/modal-type";
import Overlay from "./overlay";

interface IModal {
  modal: ModalProps;
  submit: () => void;
  cancel: () => void;
}

const Modal: NextPage<IModal> = ({ modal, submit, cancel }) => {
  return (
    <>
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
      <Overlay />
    </>
  );
};

export default Modal;
