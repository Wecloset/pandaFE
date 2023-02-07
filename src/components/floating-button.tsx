import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";

const FloatingButton: NextPage = () => {
  return (
    <Link href="/create" className="fixed bottom-20 translate-x-[320px]">
      <button className="rounded-full bg-primary-violet p-3 shadow-md">
        <Icon
          icon="ic:baseline-plus"
          aria-label="게시글 작성하기"
          className=" text-3xl"
        />
      </button>
    </Link>
  );
};

export default FloatingButton;
