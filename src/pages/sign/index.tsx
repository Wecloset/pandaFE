import axios from "axios";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import Button from "../../components/ui/button";
import Header from "../../components/ui/header";
import SignForm from "../../components/sign/sign-form";
import useToast from "../../hooks/useToast";

const Sign: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const alerted = useRef(false);

  const { setToast, Toast } = useToast();

  const findUser = async (findUser: string) => {
    const { data: response } = await axios.get(`/api/user?email=${findUser}`);
    return response;
  };

  const { mutate, data } = useMutation(findUser);

  const handleSignGoogle = async () => {
    await signIn("google");
  };
  const handleSignKakao = async () => {
    await signIn("kakao");
  };

  useEffect(() => {
    session && mutate(session?.user?.email as string);
  }, [session]);

  useEffect(() => {
    if (session && data && data.user.keywords) {
      // 키워드가 존재하면 존재하는 회원이기때문에 여기서 구문처리
      if (data.user.keywords.length === 0 && !alerted.current) {
        alerted.current = true;
        router.replace(
          {
            pathname: "/signtag",
            query: {
              email: session.user?.email,
            },
          },
          "/signtag",
        );
        return;
      } else {
        setToast("유저 정보가 이미 존재하여 로그인처리 됩니다.");
        setTimeout(() => router.replace("/"), 2500);
        return;
      }
    }
  }, [data]);

  return (
    <>
      <Header text="SIGNUP" goBack />
      <SignForm />
      <div className="w-full">
        <div className="my-8 mt-4 inline-flex w-full items-center justify-center">
          <hr className="h-px w-full border-0 bg-black dark:bg-black" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            or
          </span>
        </div>
        <div className="px-5">
          <div>
            <Button
              type="button"
              onClick={handleSignGoogle}
              text="Continue With Google"
              icon="ph:google-logo"
              textWidth="w-3/5"
              classes="border-solid bg-white border border-black"
              btnWrapClasses="pb-3"
              fontColor="text-black"
            />
          </div>
          <Button
            type="button"
            onClick={handleSignKakao}
            text="Continue With Kakao"
            icon="ri:kakao-talk-fill"
            textWidth="w-3/5"
            fontColor="text-black"
            classes="border-solid border border-black bg-primary-yellow"
          />
        </div>
      </div>
    </>
  );
};

export default Sign;
