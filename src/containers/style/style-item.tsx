import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Link from "next/link";

const PostPage: NextPage = () => {
  return (
    <div className="py-10">
      <div className="relative">
        <div className="h-[370px] w-full bg-slate-200" />
        <div className="absolute top-1/2 flex w-full items-center justify-between px-5 text-2xl">
          <Icon icon="material-symbols:chevron-left" className="invisible" />
          <Icon icon="material-symbols:chevron-right" />
        </div>
        <div className="absolute bottom-2 flex h-[3px] w-[390px] justify-center space-x-0.5">
          <span className="block h-[3px] w-11 bg-white" />
          <span className="block h-[3px] w-11 bg-white" />
          <span className="block h-[3px] w-11 bg-white" />
        </div>
      </div>
      <div className="relative p-5">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 h-[50px] w-[50px] rounded-full border border-common-black" />
              <p className="text-base font-bold">username</p>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
              <Icon icon="icon-park-outline:like" className="text-lg" />
            </div>
          </div>
          <p>텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트</p>
          <div className="mt-5 mb-7 flex gap-[18px] text-xs text-commom-gray">
            <div>2023.01.28</div>
            <div>조회 128</div>
            <div>좋아요 48</div>
          </div>
        </div>
        <div className="min-h-[170px] border-t border-b border-borderColor-gray py-[18px]">
          <div>
            <h2 className="mr-2 inline-block text-lg">comments</h2>
            <span className="text-base font-bold">2</span>
          </div>
          <ul className="mt-[14px]">
            <li className="flex gap-3">
              <b className="text-base font-bold">zoala</b>
              댓글 댓글
            </li>
          </ul>
        </div>
        <div>
          <h2 className="my-[18px] text-lg">Tagged</h2>
          <ul className="flex gap-2">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <li key={idx}>
                  <Link href="">
                    <div className="mb-2 h-[135px] w-[123px] border border-common-black bg-borderColor-gray " />
                  </Link>
                  <dl className="w-[123px]">
                    <dt className="truncate">Vivienne Westwood</dt>
                    <dd className="truncate text-xs text-textColor-gray-100">
                      비비안 웨스트우드 카드지갑
                    </dd>
                    <dd className="mt-2 flex items-center">
                      <span
                        aria-label="판매상품"
                        className="mr-[6px] -mt-1 border border-primary-green px-1 text-xs text-primary-green"
                      >
                        판매
                      </span>
                      <span aria-label="가격" className="text-base font-bold">
                        185000
                      </span>
                    </dd>
                  </dl>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex h-[60px] w-[390px] items-center justify-between border-t border-borderColor-gray bg-white px-5">
        <input type="text" placeholder="댓글을 입력해주세요." />
        <Icon
          icon="tabler:mood-smile"
          className="cursor-pointer text-xl text-textColor-gray-100"
        />
      </div>
    </div>
  );
};

export default PostPage;
