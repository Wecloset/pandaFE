import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Button from "../components/ui/button";

const SearchPage: NextPage = () => {
  return (
    <div className="px-5 py-10">
      <form className="relative">
        <input
          type="text"
          placeholder="검색"
          className="w-full border-b border-common-black py-2 pl-[10px] pr-10"
        />
        <Icon
          icon="mdi:close-circle-outline"
          className="absolute right-[10px] bottom-2 cursor-pointer text-xl"
        />
      </form>
      <div className="mt-6">
        <h2 className="mb-5 text-base font-bold">추천 검색어</h2>
        <ul className="flex flex-wrap gap-5 text-[34px] [&>li]:cursor-pointer">
          <li>#샤넬</li>
          <li>#구찌</li>
          <li>#COS</li>
          <li>#Y2K</li>
          <li>#NIKE</li>
          <li>#ACNE STUDIOS</li>
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="mb-3 text-base font-bold">최근 검색어</h2>
        <ul className="space-y-1 [&_svg]:-mt-0.5 [&_svg]:ml-2 [&_svg]:cursor-pointer [&_svg]:text-lg [&_svg]:text-textColor-gray-50">
          <li className="flex items-center">
            하이엔드
            <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
          </li>
          <li className="flex items-center">
            스투시
            <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
          </li>
          <li className="flex items-center">
            빈티지
            <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
          </li>
        </ul>
      </div>
      <Button text="검색" />
    </div>
  );
};

export default SearchPage;
