import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigation: NextPage = () => {
  const { pathname } = useRouter();
  return (
    <footer className="fixed bottom-0 z-20 flex h-12 w-[390px] items-center justify-between bg-black p-5 text-lg shadow dark:border-gray-600 dark:bg-gray-800">
      <Link href="/">
        <button
          className={`${
            pathname === "/" ? "text-primary-violet" : "text-white"
          }`}
        >
          HOME
        </button>
      </Link>
      <Link href="market">
        <button
          className={`${
            pathname === "/market" ? "text-primary-violet" : "text-white"
          }`}
        >
          MARKET
        </button>
      </Link>
      <Link href="lookbook">
        <button
          className={`${
            pathname === "/lookbook" ? "text-primary-violet" : "text-white"
          }`}
        >
          STYLE
        </button>
      </Link>
      <Link href="mypage">
        <button
          className={`${
            pathname === "/mypage" ? "text-primary-violet" : "text-white"
          }`}
        >
          MY
        </button>
      </Link>
    </footer>
  );
};

export default Navigation;
