import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer: NextPage<string | any> = () => {
  const { pathname } = useRouter();
  return (
    <footer className="sticky bottom-0 left-0 z-20 h-10 w-full border-t border-gray-200 bg-black  p-4 shadow dark:border-gray-600 dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
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
      <Link href="style">
        <button
          className={`${
            pathname === "/style" ? "text-primary-violet" : "text-white"
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

export default Footer;
