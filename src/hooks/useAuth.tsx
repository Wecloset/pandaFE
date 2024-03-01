import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useMutation } from "react-query";

import useModal from "./useModal";
import { apiGet } from "../utils/request";

const useAuth = () => {
  const { data: userEmail, status: session } = useSession();

  const { setAuthModalState } = useModal();

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

    if (session === "unauthenticated") {
      console.log("사용자 인증 오류!");
      setAuthModalState();
      return;
    }
  }, [session]);

  return { userData, mutateStatus };
};

export default useAuth;
