import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { setModalProps } from "../../types/modal-type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface FloatingButtonProps {
  path: string;
  setModal: setModalProps;
}

const FloatingButton: NextPage<FloatingButtonProps> = ({ path, setModal }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const goLoginPage = () => router.push("/login");

  const modalHandler = () => {
    if (!session) {
      setModal({
        message: "로그인 후 이용 가능합니다.,로그인페이지로 이동할까요?",
        btnText: "로그인 하기",
        submit: goLoginPage,
      });
    }
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
