import { NextPage } from "next";
import { Icon } from "@iconify/react";
import { ChangeEvent } from "react";
import Button from "../components/ui/button";
import { cls } from "../lib/class";
import Prev from "../components/ui/prev";

interface CreateProps {
  isText: boolean;
  textAreaValue: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CreatePage: NextPage<CreateProps> = ({ isText, textAreaValue }) => {
  return (
    <div className="px-5">
      <Prev text="게시글 작성" />
      <div className="mb-6">
        <label className="flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-1 border bg-gray-100 text-textColor-gray-100">
          <input type="file" className="hidden" />
          <Icon icon="bxs:image-add" className="text-2xl" />
          <p>0/10</p>
        </label>
      </div>
      <div className="border-t border-b border-borderColor-gray pb-2 [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
        <input type="text" name="title" placeholder="제목" />
        <input type="text" name="price" placeholder="가격" />
        <div className="relative h-auto w-full p-5">
          <textarea
            name="item"
            id="item"
            rows={10}
            className={cls("peer w-full resize-none", isText ? "is-valid" : "")}
            onChange={textAreaValue}
          ></textarea>
          <div className="pointer-events-none absolute top-5 left-5 text-commom-gray peer-focus:hidden peer-[.is-valid]:hidden">
            <p>아이템에 대한 설명을 작성해주세요.</p>
            <p className="mt-3">작성예시. 제품상태, 사이즈, 소재 등 자세히</p>
          </div>
        </div>
        <input
          type="text"
          name="tag"
          placeholder="검색에 사용될 태그를 작성해주세요. Ex. #빈티지"
          className="border"
        />
      </div>
      <div className="[&>*]:flex [&>*]:h-[52px] [&>*]:items-center [&>*]:justify-between [&>*]:border-b [&>*]:px-4">
        <div>
          <span>카테고리</span>
          <Icon icon="material-symbols:arrow-outward" />
        </div>
        <div>
          <span>브랜드</span>
          <Icon icon="material-symbols:arrow-outward" />
        </div>
        <div>
          <span>대여 가능</span>
          <Icon icon="material-symbols:arrow-outward" />
        </div>
      </div>
      <Button text="완료" />
    </div>
  );
};

export default CreatePage;
