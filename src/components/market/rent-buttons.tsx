import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { FilterContext } from "../../store/filter-context";

const RentButtons = () => {
  const { isRent, setRentStatus } = useContext(FilterContext);
  return (
    <div className="flex">
      <button
        className={`mr-2 rounded-full border border-common-black px-2 py-0.5 ${
          isRent && "bg-common-black text-white"
        }`}
        onClick={() => setRentStatus(true)}
      >
        대여상품
      </button>
      <button
        className={`mr-2 rounded-full border border-common-black px-2 py-0.5 ${
          isRent === false && "bg-common-black text-white"
        }`}
        onClick={() => setRentStatus(false)}
      >
        판매상품
      </button>
      <button aria-label="되돌리기" onClick={() => setRentStatus("")}>
        <Icon icon="carbon:reset" className="text-2xl" />
      </button>
    </div>
  );
};

export default RentButtons;
