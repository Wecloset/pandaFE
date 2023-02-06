import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Prev: NextPage<string | any> = ({ text }) => {
  return (
    <div className="sticky top-0 z-10 flex items-center bg-white px-3 py-5 ">
      <Link href="/" className="text-2xl">
        <Icon
          icon="material-symbols:arrow-back-rounded"
          aria-label="뒤로가기"
        />
      </Link>
      <p className="flex w-4/5 justify-center text-base font-bold">{text}</p>
    </div>
  );
};

export default Prev;
