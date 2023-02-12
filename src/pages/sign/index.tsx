import type { NextPage } from "next";
import ButtonItem from "../../components/button";
import Header from "../../components/header";
import SignForm from "../../components/sign/sign-form";

const Sign: NextPage = () => {
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
      </div>
    </>
  );
};

export default Sign;
