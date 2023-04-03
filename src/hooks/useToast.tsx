import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

const useToast = () => {
  const [toastValue, setToastValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const closeModal = () => setToastValue("");

  const setToast = (message: string, error?: boolean) => {
    setToastValue(message);
    !error ? setIsError(false) : setIsError(true);
  };

  const Toast = () => {
    const [isHide, setIsHide] = useState<boolean>(false);

    useEffect(() => {
      if (!isHide) return;
      const timer = setTimeout(() => {
        closeModal();
      }, 1000);
      return () => clearTimeout(timer);
    }, [isHide]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsHide(true);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    let subText: string[] = [];

    if (toastValue)
      subText = toastValue.includes(",") ? toastValue.split(",") : [toastValue];

    const animationClass = isHide ? "animate-hide" : "animate-popup";

    return (
      <>
        {toastValue !== "" ? (
          <div
            className={`${animationClass} fixed top-28 z-50 w-[330px] space-y-3 rounded-md bg-common-black py-5 text-center text-white shadow-lg transition`}
          >
            <div className="flex items-center justify-center gap-2">
              {!isError && (
                <div
                  className="relative h-4 w-4 rounded-full bg-primary-green
            after:absolute after:top-1 after:left-1 after:block after:h-[5px] after:w-2 after:-rotate-45 after:border-2
            after:border-t-0 after:border-r-0 after:border-common-black"
                />
              )}
              {isError && (
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
              onClick={closeModal}
            >
              <Icon icon="ic:baseline-clear" />
            </button>
          </div>
        ) : null}
      </>
    );
  };

  return { setToast, Toast };
};

export default useToast;
