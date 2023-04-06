import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: NextPage) => {
  const Auth: NextPage = props => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (session !== null) {
        router.push("/");
      }
    }, []);

    return session !== null ? null : <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
