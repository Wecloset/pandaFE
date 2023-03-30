import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { FilterContext } from "../../store/filter-context";
import { cls } from "../../utils/class";

const RentButtons = () => {
  const { isRent, setRentStatus } = useContext(FilterContext);
  return (
    <div className="flex gap-3">
      <div className="relative w-20">
        <button
          className={cls(
            "absolute z-10 mr-2 h-full w-full rounded-full border border-common-black bg-white px-2",
            isRent ? "bg-primary-green text-common-black" : "",
          )}
          onClick={() => setRentStatus(true)}
        >
          대여상품
        </button>
        <span className="absolute top-[2px] left-[2px] h-full w-full rounded-full bg-common-black" />
      </div>
      <div className="relative w-20">
        <button
          className={cls(
            "absolute z-10 mr-2 h-full w-full rounded-full border border-common-black bg-white px-2",
            isRent === false ? "bg-primary-green text-common-black" : "",
          )}
          onClick={() => setRentStatus(false)}
        >
          판매상품
        </button>
        <span className="absolute top-[2px] left-[2px] h-full w-full rounded-full bg-common-black" />
      </div>
      <button aria-label="되돌리기" onClick={() => setRentStatus("")}>
        <Icon icon="carbon:reset" className="text-2xl" />
      </button>
    </div>
  );
};

export default RentButtons;
