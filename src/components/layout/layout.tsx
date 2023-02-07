import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logo from "../../../public/asset/image/full-logo-white.png";

const MainLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-gray-800">
      <div className="mx-auto flex h-screen w-[900px] justify-between bg-gray-800 max-xl:w-auto">
        <div className="flex flex-col justify-between py-7 max-xl:hidden">
          <div>
            <Image src={logo} alt="logo" className="w-28" />
          </div>
          <div>
            <div className="-mt-20 space-y-4 text-white">
              <p className="text-4xl">세컨핸드 렌탈 플랫폼</p>
              <p className="text-5xl font-semibold">
                <span className="text-primary-violet">판다</span> panda
              </p>
            </div>
            <div className="relative mt-6 flex items-center">
              <input
                type="text"
                className="w-[400px] rounded-full py-4 px-7 text-xl text-gray-700 focus:outline-none"
              />
              <Icon
                icon="ion:search-sharp"
                className="absolute right-4 cursor-pointer text-3xl"
              />
            </div>
          </div>
          <div className="flex h-12 w-40 cursor-pointer items-center rounded-3xl bg-white px-1">
            <Icon icon="mdi:github" className="mr-2 text-4xl" />
            <span className="text-sm text-gray-700">github 바로가기</span>
          </div>
        </div>
        <div className="relative w-[390px] flex-shrink-0 overflow-hidden overflow-y-scroll bg-white scrollbar-hide max-xl:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
