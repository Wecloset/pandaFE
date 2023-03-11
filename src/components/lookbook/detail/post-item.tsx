import { Icon } from "@iconify/react";
import { NextPage } from "next";
import ImageSlide from "../../market/detail/image-slide";
import TagItem from "./tag-item";

const PostItem: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 rounded-full border border-common-black"></div>
          <div>
            <p className="text-sm font-bold">username</p>
            <p className="text-xs text-commom-gray">2023.03.11</p>
          </div>
        </div>
      </div>
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
      {/* <ImageSlide /> */}
      <div className="relative p-5">
        <div>
          <div className="mb-4 flex gap-2 text-xs text-commom-gray">
            <div>조회 128</div>
            <div>좋아요 48</div>
          </div>
          <p className="mb-2">
            텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트
          </p>
          <span className="w-auto cursor-pointer text-commom-gray hover:underline">
            댓글 2개
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-3 text-2xl [&>svg]:cursor-pointer">
          <Icon icon="ci:chat-circle" />
          <Icon icon="icon-park-outline:like" />
        </div>
        <div className="py-4">
          <div>
            <h2 className="mr-2 inline-block text-lg">comments</h2>
            <span className="text-base font-bold">2</span>
          </div>
          <ul className="mt-3">
            <li className="flex gap-3">
              <b className="text-base font-bold">zoala</b>
              댓글 댓글
            </li>
          </ul>
        </div>
        <div className="border-t border-borderColor-gray">
          <h2 className="mt-[18px] text-lg">Tagged</h2>
          <ul className="mt-3 flex gap-2 overflow-y-scroll scrollbar-hide">
            <TagItem />
          </ul>
        </div>
      </div>
    </>
  );
};

export default PostItem;
