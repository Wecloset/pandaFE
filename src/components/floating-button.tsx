import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";

const FloatingButton: NextPage<{ path: string }> = ({ path }) => {
  return (
    <Link href={path} className="fixed bottom-24 translate-x-[310px]">
      <button className="rounded-full border border-primary-violet bg-black p-3 shadow-lg">
        <Icon
          icon="ic:baseline-plus"
          aria-label="게시글 작성하기"
          className="text-3xl text-primary-violet"
        />
      </button>
    </Link>
  );
};

export default FloatingButton;
