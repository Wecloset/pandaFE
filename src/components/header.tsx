import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/asset/image/logo.png";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

interface HeaderProps {
  goBack?: boolean;
  text?: string;
  noGoBack?: boolean;
}

//임시로 sign out 설정

const Header: NextPage<HeaderProps> = ({ goBack, text, noGoBack }) => {
  const router = useRouter();
  return (
    <>
      {!goBack ? (
        <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-b-common-black bg-white px-5">
          <Link href="/">
            <Image src={logo} alt="로고이미지" className="h-10 w-7" />
          </Link>
          <div className="flex">
            <Link href="" className="text-[28px]">
              <Icon icon="uil:message" aria-label="채팅하기" />
            </Link>
            <Link href="search" className="ml-3 text-[28px]">
              <Icon icon="ion:search-sharp" aria-label="검색하기" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-10 flex h-[60px] items-center border-b border-b-common-black bg-white px-3">
          {!noGoBack ? (
            <>
              <button
                type="button"
                onClick={() => router.back()}
                className="text-2xl"
              >
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  aria-label="뒤로가기"
                />
              </button>
              <p className="flex w-[88%] select-none justify-center text-base font-bold">
                {text?.toUpperCase()}
              </p>
            </>
          ) : (
            <p className="flex w-full select-none justify-center text-base font-bold">
              {text?.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
