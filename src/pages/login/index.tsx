import type { NextPage } from "next";
import Image from "next/image";
import logo from "../../../public/asset/image/full-logo.png";
import ButtonItem from "../../components/ui/buttonitem";

const Login: NextPage = () => {
  return (
    <div className="bg-black">
      <div className="pb-10 pt-16">
        <Image src={logo} alt="logo" className="m-auto h-28" />
      </div>
      <div className="px-8 pb-2 [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
        <input
          type="text"
          name="email"
          placeholder="이메일"
          className="bg-black text-white placeholder:text-white focus:border-primary-green "
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="bg-black text-white placeholder:text-white focus:border-primary-green"
        />
      </div>
      <div className="mt-7">
        <ButtonItem
          text="로그인"
          color="bg-commom-gray"
          hover="hover:bg-primary-green"
        />
        <ButtonItem text="회원가입" fontColor="text-white" />
      </div>
      <div className="h-36" />
      <div className="mt-7">
        <div>
          <ButtonItem
            text="Continue With Google"
            color="bg-white"
            icon="ph:google-logo"
            logo="flex items-center"
            textWidth="w-4/5"
          />
        </div>

        <ButtonItem
          text="Continue With Kakao"
          color="bg-primary-yellow"
          icon="ri:kakao-talk-fill"
          logo="flex items-center"
          textWidth="w-4/5"
        />
      </div>
    </div>
  );
};

export default Login;
