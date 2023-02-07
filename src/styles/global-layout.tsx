import { NextPage } from "next";
import Image from "next/image";
import logo from "../../public/asset/image/full-logo-white.png";

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
              <button
                type="button"
                className="absolute right-4 cursor-pointer text-3xl text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button className="flex h-12 w-40 items-center rounded-3xl bg-white px-1 font-bold text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="mr-2 text-4xl"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
              />
            </svg>
            github 바로가기
          </button>
        </div>
        <div className="relative w-[390px] flex-shrink-0 overflow-hidden overflow-y-scroll bg-white scrollbar-hide max-xl:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
