import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Button from "../../components/button";
import Header from "../../components/header";

const Product: NextPage = () => {
  return (
    <>
      <Header goBack />
      <div className="relative">
        <div className="h-[370px] w-full bg-slate-200" />
        <div className="absolute top-1/2 flex w-full items-center justify-between px-5 text-2xl">
          <Icon icon="material-symbols:chevron-left" />
          <Icon icon="material-symbols:chevron-right" />
        </div>
        <div className="absolute bottom-2 flex h-[3px] w-[390px] justify-center space-x-0.5">
          <span className="block h-[3px] w-11 bg-white" />
          <span className="block h-[3px] w-11 bg-white" />
          <span className="block h-[3px] w-11 bg-white" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <p className="text-base">Patagonia</p>
            <h1 className="text-xl font-bold">파타고니아 봄버 자켓</h1>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
            <Icon icon="icon-park-outline:like" className="text-lg" />
          </div>
        </div>
        <div className="mt-4 mb-6 flex gap-2">
          <div className="rounded-full border border-common-black px-2 py-0.5">
            OUTER
          </div>
          <div className="rounded-full border border-common-black px-2 py-0.5">
            Pategonia
          </div>
        </div>
        <div className="mb-4 flex text-xs text-commom-gray">
          <span className="mr-2">조회 22</span>
          <span>찜 1</span>
        </div>
        <div className="border-t border-b py-[18px]">
          <p className="mb-8">
            파타고니아의 봄버 자켓입니다. <br />
            호불호 많이 없는 올리브 컬러로 아무착장에 걸치기만해도 잘 어울리는
            자켓입니다. <br /> 무게도 가볍고 이제 겨울 끝나가는 시점 봄까지
            유용하게 입으실 수 있겠습니다.
          </p>
          <ul className="flex space-x-3 text-primary-violet">
            <li>#태그</li>
            <li>#태그</li>
          </ul>
        </div>
        <div className="py-5">
          <h3 className="mb-4 text-lg font-bold">Seller</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-[50px] w-[50px] rounded-full border border-common-black bg-slate-400" />
              <span className="ml-4 text-base font-bold">username</span>
            </div>
            <button className="h-8 bg-black px-4 py-1 text-white">
              메시지
            </button>
          </div>
        </div>
      </div>
      <div className=" bottom-0 flex w-full items-center justify-between pl-5">
        <p className="text-2xl font-bold">
          {"90000".replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <span className="text-lg">원</span>
        </p>
        <div className="relative w-64">
          <Button text="구매하기" color="bg-black" fontColor="text-white" />
        </div>
      </div>
    </>
  );
};
export default Product;
