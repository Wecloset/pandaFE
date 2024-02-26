import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";

import useModal from "./useModal";
import { apiGet } from "../utils/request";

const useAuth = () => {
  const { data: userEmail, status: session } = useSession();

  const router = useRouter();

  // const goLoginPage = () => router.push("/login");

  // * TODO: modal로직 분리 (context API)
  const { show: showModal, setModalState, Modal } = useModal();

  const {
    data: userData,
    mutate: mutateFn,
    status: mutateStatus,
  } = useMutation({
    mutationFn: (key: string) => apiGet.GET_USER(key),
  });

  useEffect(() => {
    if (session === "authenticated") {
      mutateFn(userEmail.user?.email as string);
      return;
    }

    // if (status === "unauthenticated") {
    //   console.log("사용자 인증 오류!");
    //   const modalProps = {
    //     message:
    //       "사용자 인증이 해제되어 재로그인이 필요합니다.,로그인페이지로 이동할까요?",
    //     btnText: "재로그인하기",
    //     submit: goLoginPage,
    //   };
    //   setModalState(modalProps);
    //   return;
    // }
  }, [session]);

  return { userData, mutateStatus };
};

export default useAuth;
