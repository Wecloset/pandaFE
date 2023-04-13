import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

//관리 page : login , mypage, sign, signprofile, signtag, create, mypageprofile

// 세션이 없다 => 로그인 안됨 => 로그인 안된상태일때 접근 금지 : mypage, mypageprofile, create,
// 세션이 없다 => 로그인 안됨 => 로그인 안된상태일때 접근 가능 : login, sign, signprofile, signtag

const noExistUser = (WrappedComponent: NextPage) => {
  const Auth: NextPage = props => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // session === null
      if (session === null) {
        router.push("/");
      }
    }, [session]);

    if (status === "loading" || session === undefined) {
      return <div>로딩중입니다</div>;
    }

    return session === null ? null : <WrappedComponent {...props} />;
  };

  return Auth;
};

export default noExistUser;
