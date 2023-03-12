import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { LookbookData } from "../../../types/data-type";
import ImageSlide from "../../market/detail/image-slide";
import TagItem from "./tag-item";

const PostItem: NextPage<LookbookData> = ({
  user,
  imgurl,
  likes,
  description,
  hashTag,
  product,
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center">
          <img
            src={user.profileImg}
            alt=""
            className="mr-3 h-10 w-10 rounded-full border-2 border-common-black"
          />
          <div>
            <p className="text-sm font-bold">{user.nickname}</p>
          </div>
        </div>
      </div>
      <ImageSlide images={imgurl} />
      <div className="relative p-5">
        <div>
          <div className="mb-3 flex gap-2 text-xs text-commom-gray">
            <div>2023.03.11</div>
            <div>좋아요 {likes}</div>
          </div>
          <p className="mb-2">
            <span className="mr-2">{description}</span>
            {hashTag?.map(({ tag }, i) => (
              <span key={`태그${i}`} className="mr-1">
                <span>#</span>
                <span>{tag}</span>
              </span>
            ))}
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
        {product.length > 0 && (
          <div className="border-t border-borderColor-gray">
            <h2 className="mt-[18px] text-lg">Tagged</h2>
            <ul className="mt-3 flex gap-2 overflow-y-scroll scrollbar-hide">
              <TagItem {...product} />
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PostItem;
