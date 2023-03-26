import axios from "axios";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import ButtonItem from "../../components/button";
import Header from "../../components/header";
import SignForm from "../../components/sign/sign-form";

const Sign: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const alerted = useRef(false);

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
      if (data.user.keywords.length === 0 && !alerted.current) {
        alerted.current = true;
        alert("유저 정보가 존재하지 않습니다. 회원가입을 진행하겠습니다");
        router.push("/signtag");
        return;
      } else {
        alert("유저 정보가 존재합니다. 로그인 되었습니다");
        router.push("/");
        return;
      }
    }
  }, [data]);

  return (
    <>
      <Header text="SIGNUP" goBack />
      <SignForm />
      <div className="px-5">
        <div className="my-8 mt-4 inline-flex w-full items-center justify-center">
          <hr className=" h-px w-80 border-0 bg-black dark:bg-black" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            or
          </span>
        </div>
        <div>
          <ButtonItem
            onClick={handleSignGoogle}
            text="Continue With Google"
            color="bg-white"
            icon="ph:google-logo"
            logo="flex items-center"
            textWidth="w-4/5"
            border="rounded border-solid border-2 border-black	"
          />
        </div>
        <ButtonItem
          onClick={handleSignKakao}
          text="Continue With Kakao"
          color="bg-primary-yellow"
          icon="ri:kakao-talk-fill"
          logo="flex items-center"
          textWidth="w-4/5"
          border="rounded  border-solid border-2 border-black	"
        />
      </div>
    </>
  );
};

export default Sign;
