import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Link href="/">
        <h1>홈페이지</h1>
      </Link>
      <Link href="/login">
        <h1>로그인</h1>
      </Link>
      <Link href="/sign">
        <h1>회원가입</h1>
      </Link>
      <Link href="/create">
        <h1>게시글작성</h1>
      </Link>
      <Link href="/search">
        <h1>검색하기</h1>
      </Link>
      <Link href="/mypage">
        <h1>마이페이지</h1>
      </Link>
    </>
  );
};

export default Home;
