import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface ToastProps {
  error?: boolean;
  message: string;
  onClose: () => void;
}

const Toast: NextPage<ToastProps> = ({ error, message, onClose }) => {
  const [isHide, setIsHide] = useState<boolean>(false);
  let subText: string[] = [];

  if (message) subText = message.includes(",") ? message.split(",") : [message];

  const animationClass = isHide ? "animate-hide" : "animate-popup";

  useEffect(() => {
    if (!isHide) return;
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [isHide]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHide(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${animationClass} fixed top-28 z-50 w-[330px] space-y-3 rounded-md bg-common-black py-5 text-center text-white shadow-lg transition`}
    >
      <div className="flex items-center justify-center gap-2">
        {!error && (
          <div
            className="relative h-4 w-4 rounded-full bg-primary-green 
          after:absolute after:top-1 after:left-1 after:block after:h-[5px] after:w-2 after:-rotate-45 after:border-2
          after:border-t-0 after:border-r-0 after:border-common-black"
          />
        )}
        {error && (
          <div className="relative h-4 w-4 rounded-full bg-error">
            <Icon
              icon="mdi:exclamation-thick"
              className="absolute top-[1px] left-[1px] text-black"
            />
          </div>
        )}
        <div>
          {subText.map((text, i) => (
            <p key={`${text}-${i}`}>{text}</p>
          ))}
        </div>
      </div>
      <button
        className="absolute top-0 right-3 cursor-pointer"
        onClick={onClose}
      >
        <Icon icon="ic:baseline-clear" />
      </button>
    </div>
  );
};

export default Toast;
