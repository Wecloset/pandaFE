import type { NextPage } from "next";
import ButtonItem from "../../components/ui/buttonitem";

const Sign: NextPage = () => {
  return (
    <div className="px-5 py-10">
      <div className="px-3 pb-10 [&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
        <p className="mb-2 px-2 text-lg">사용하실 이메일을 입력해주세요.</p>
        <input
          type="text"
          name="email"
          placeholder="아이디(이메일)"
          className=" text-black placeholder:text-textColor-gray-100"
        />
      </div>
      <div className="px-3 pb-6 [&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
        <p className="mb-2 px-2 text-lg">비밀번호를 입력해주세요.</p>
        <p className="mb-2 px-2 text-xs text-textColor-gray-100">
          6자리 이상의 비밀번호를 설정해주세요.
        </p>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className=" text-black placeholder:text-textColor-gray-100"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          className=" text-black placeholder:text-textColor-gray-100"
        />
      </div>
      <div className="px-3 pb-10 [&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
        <p className="mb-2 px-2 text-lg">사용하실 닉네임을 입력해주세요.</p>
        <div className="mx-2 flex">
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            className=" mr-4 border-b-2 text-black placeholder:text-textColor-gray-100"
          />
          <button className="h-10 w-3/5 bg-black text-white">중복확인</button>
        </div>
      </div>
      <div className="inline-flex w-full items-center justify-center">
        <hr className="my-8 h-px w-80 border-0 bg-black dark:bg-black" />
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
          or
        </span>
      </div>
      <div className="mt-7">
        <div>
          <ButtonItem
            text="Continue With Google"
            color="bg-white"
            icon="ph:google-logo"
            logo="flex items-center"
            textWidth="w-4/5"
            border="rounded border-solid border-2 border-black	"
          />
        </div>

        <ButtonItem
          text="Continue With Kakao"
          color="bg-primary-yellow"
          icon="ri:kakao-talk-fill"
          logo="flex items-center"
          textWidth="w-4/5"
          border="rounded  border-solid border-2 border-black	"
        />
        <ButtonItem
          text="다음"
          color="bg-commom-gray"
          hover="hover:bg-primary-green"
        />
      </div>
    </div>
  );
};

export default Sign;
