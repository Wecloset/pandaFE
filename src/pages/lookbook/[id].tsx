import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Header from "../../components/header";
import PostItem from "../../components/lookbook/detail/post-item";

const Post: NextPage = () => {
  return (
    <div>
      <Header goBack />
      <PostItem />
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

export default Post;
