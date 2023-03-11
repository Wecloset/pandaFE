import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loading-spinner";
import PostItem from "../../components/lookbook/detail/post-item";
import { LookbookData } from "../../types/data-type";
import { axiosGet } from "../../utils/services";

const Post: NextPage = () => {
  const router = useRouter();
  const { id: lookbookId } = router.query;

  const getOnePost = async () => {
    try {
      const { data } = await axiosGet(`/api/look/${lookbookId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPost = async () => {
    try {
      const { data } = await axiosGet(`/api/look`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: postData, isLoading } = useQuery("getPost", getOnePost);

  const { data: allLooks, isLoading: isAllLoaded } = useQuery(
    "getPosts",
    getAllPost,
  );

  return (
    <div>
      <div className="pb-10">
        <Header goBack />
        {isLoading && <LoadingSpinner />}
        {!isLoading && <PostItem {...postData} />}
        {!isAllLoaded &&
          allLooks.map((look: LookbookData) => (
            <PostItem key={look.id} {...look} />
          ))}
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

export default Post;
