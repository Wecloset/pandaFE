import { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Icon } from "@iconify/react";

import useModal from "../../hooks/useModal";

const FloatingButton: NextPage<{ path: string }> = ({ path }) => {
  const { data: session } = useSession();
  const { setLoginModalState } = useModal();

  const modalHandler = () => {
    if (!session) setLoginModalState();
  };

  return (
    <Link
      href={!session ? "" : path}
      className="fixed bottom-24 z-30 translate-x-[310px]"
      onClick={modalHandler}
    >
      <button className="rounded-full border border-primary-violet bg-black p-3 shadow-lg hover:animate-spin">
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
