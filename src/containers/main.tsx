import { NextPage } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";

const MainPage: NextPage = () => {
  return (
    <>
      <div className="h-72 w-full bg-borderColor-gray"></div>
      <div className="space-y-8 py-10">
        <div className="space-y-5 px-5">
          <div>
            <h2 className="text-xl">Style for You</h2>
            <p className="text-textColor-gray-100">
              조은님의 키워드에 적합한 추천리스트
            </p>
          </div>
          <div className="flex items-center text-base font-bold text-textColor-gray-50">
            <button>키워드</button>
            <button>키워드</button>
            <button>키워드</button>
          </div>
          <ul className="flex items-center gap-[10px]">
            <li>
              <Link href="">
                <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
                <dl className="w-40">
                  <dt className="truncate">Vivienne Westwood</dt>
                  <dd className="truncate text-textColor-gray-100">
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
              </Link>
            </li>
            <li>
              <Link href="">
                <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
                <dl>
                  <dt className="truncate">Vivienne Westwood</dt>
                  <dd className="truncate text-textColor-gray-100">
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
              </Link>
            </li>
            <li>
              <Link href="">
                <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
                <dl>
                  <dt className="truncate">Vivienne Westwood</dt>
                  <dd className="truncate text-textColor-gray-100">
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
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-5">
          <h2 className="mb-3 text-xl">Recent Style</h2>
          <ul className="flex items-center gap-[10px]">
            <li>
              <Link href="">
                <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
                <dl>
                  <dt>Vivienne Westwood</dt>
                  <dd className=" text-textColor-gray-100">
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
              </Link>
            </li>
            <li>
              <Link href="">
                <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
                <dl>
                  <dt>Vivienne Westwood</dt>
                  <dd className=" text-textColor-gray-100">
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
              </Link>
            </li>
            <li>
              <Link href="">
                <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
                <dl>
                  <dt>Vivienne Westwood</dt>
                  <dd className=" text-textColor-gray-100">
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
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 px-5 text-xl">Look Book</h2>
          <div className="border border-t-common-black border-b-common-black">
            <ul className="flex">
              <li className="border-r border-common-black py-4 px-3 first:pl-0">
                <div className="relative h-56 w-48 bg-borderColor-gray">
                  <p className="absolute bottom-4 left-4">@username</p>
                </div>
              </li>
              <li className="border-r border-common-black py-4 px-3 first:pl-0">
                <div className="relative h-56 w-48 bg-borderColor-gray">
                  <p className="absolute bottom-4 left-4">@username</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-52 w-full bg-borderColor-gray py-10 text-center text-white">
          <p className="text-base">매일 수익이 발생하는 옷장공유</p>
          <p className="mt-1 text-2xl">지금 시작해보세요!</p>
          <button className="mt-5 h-12 w-32 cursor-pointer bg-black">
            바로가기
          </button>
        </div>
      </div>
      <button className="sticky bottom-20 left-[310px] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary-violet text-3xl shadow-md">
        <Icon icon="ic:baseline-plus" />
      </button>
    </>
  );
};

export default MainPage;
