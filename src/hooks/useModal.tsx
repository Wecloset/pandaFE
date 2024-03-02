import { useRouter } from "next/router";
import { useContext } from "react";

import Modal from "../components/ui/modal";

import { modalContext } from "../context/modal-context";
import { ModalProps } from "../types/modal-type";
import { useSession } from "next-auth/react";

const useModal = () => {
  const { show, modal, submit, cancel, setModalState } =
    useContext(modalContext);

  const { data: session } = useSession();

  const router = useRouter();

  const goLoginPage = () => router.push("/login");

  const goSigninPage = () => {
    router.push(
      {
        pathname: "/signtag",
        query: {
          email: session?.user?.email,
        },
      },
      "/signtag",
    );
  };

  const modalState = {
    auth: {
      message:
        "사용자 인증이 해제되어 재로그인이 필요합니다.,로그인페이지로 이동할까요?",
      btnText: "재로그인하기",
      cancelText: "둘러보기",
      submitFn: goLoginPage,
    },
    login: {
      message: "로그인 후 이용 가능합니다.,로그인페이지로 이동할까요?",
      btnText: "로그인하기",
      submitFn: goLoginPage,
    },
    signin: {
      message: "유저 정보가 존재하지 않습니다.,회원가입을 진행할까요?",
      btnText: "회원가입하기",
      submitFn: goSigninPage,
    },
    comment: {
      message: "댓글을 삭제할까요?",
      btnText: "삭제",
    },
  };

  const setLoginModalState = () => setModalState(modalState.login);
  const setSigninModalState = () => setModalState(modalState.signin);
  const setAuthModalState = (fn: {
    cancel: (name: string, val: any, time: number) => void;
  }) => {
    const newModalState = Object.assign(
      { cancelFn: () => fn.cancel("panda_visitor", true, 3) },
      modalState.auth,
    );
    setModalState(newModalState);
  };
  const setCommentModalState = (fn: {
    cancel: () => void;
    submit: (data: any) => void;
  }) => {
    const newModalState = Object.assign(
      { cancelFn: fn.cancel, submitFn: fn.submit },
      modalState.comment,
    );
    setModalState(newModalState);
  };

  const ModalUI = () => {
    return (
      <>
        {show && (
          <Modal modal={modal as ModalProps} submit={submit} cancel={cancel} />
        )}
      </>
    );
  };

  return {
    ModalUI,
    setModalState,
    setAuthModalState,
    setLoginModalState,
    setSigninModalState,
    setCommentModalState,
  };
};

export default useModal;
