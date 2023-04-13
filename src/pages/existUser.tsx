import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

//관리 page : login , mypage, sign, signprofile, signtag, create, mypageprofile

// 세션이 있다 => 로그인 됨 => 로그인되면 접근 불가능 : login, sign, signprofile, signtag
// 세션이 있다 => 로그인 됨 => 로그인 되면 접근 가능 : mypage, mypageprofile, create

const existUser = (WrappedComponent: NextPage) => {
  const Auth: NextPage = props => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      setTimeout(() => {
        session !== null && status === "authenticated" && router.push("/");
      }, 1000);
    }, [session, status]);

    return session !== null ? null : <WrappedComponent {...props} />;
  };

  return Auth;
};

export default existUser;
