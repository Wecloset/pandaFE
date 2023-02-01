import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logo from "../../../public/asset/image/full-logo-white.png";

const MainLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full bg-gray-800 h-screen">
      <div className="w-[900px] mx-auto h-screen bg-gray-800 flex justify-between max-xl:w-auto">
        <div className="flex flex-col justify-between py-7 max-xl:hidden">
          <div>
            <Image src={logo} alt="logo" className="w-28" />
          </div>
          <div>
            <div className="space-y-4 text-white -mt-20">
              <p className="text-4xl">세컨핸드 렌탈 플랫폼</p>
              <p className="text-5xl font-semibold">
                <span className="text-primary-color1">판다</span> panda
              </p>
            </div>
            <div className="relative flex items-center mt-6">
              <input
                type="text"
                className="w-[400px] py-4 px-7 text-xl text-gray-700 focus:outline-none rounded-full"
              />
              <Icon
                icon="ion:search-sharp"
                className="absolute right-4 text-3xl cursor-pointer"
              />
            </div>
          </div>
          <div className="w-40 h-12 bg-white rounded-3xl flex items-center px-1 cursor-pointer">
            <Icon icon="mdi:github" className="text-4xl mr-2" />
            <span className="text-sm text-gray-700">github 바로가기</span>
          </div>
        </div>
        <div className="w-[390px] bg-white flex-shrink-0 max-xl:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
