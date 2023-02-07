import { NextPage } from "next";
import ButtonItem from "./button";

interface ModalInterface {
  title: string;
  subtitle: string;
  button: string;
}

const Modal: NextPage<ModalInterface> = ({ title, subtitle, button }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-50">
      <p className="my-4 text-4xl font-bold">{title}</p>
      <p className="mb-6">{subtitle}</p>
      <ButtonItem text={button} color="bg-primary-violet" />
    </div>
  );
};

export default Modal;
