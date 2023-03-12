import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery } from "react-query";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loading-spinner";
import PostItem from "../../components/lookbook/detail/post-item";
import { LookbookData } from "../../types/data-type";
import { axiosGet } from "../../utils/services";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import axios from "axios";

const Post: NextPage = () => {
  const router = useRouter();
  const { id: lookbookId } = router.query;
  const { ref, inView } = useInView();

  const getOnePost = async () => {
    try {
      const { data } = await axiosGet(`/api/look/${lookbookId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPost = async ({ pageParam = "" }: { pageParam: string }) => {
    try {
      const { data } = await axios.post(`/api/look/post?cursor=${pageParam}`, {
        lookbookId,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: postData, isLoading } = useQuery("getPost", getOnePost);

  const {
    data: posts,
    isLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "posts",
    ({ pageParam = 1 }) => getAllPost({ pageParam }),
    {
      getNextPageParam: lastPage => lastPage?.nextId ?? false,
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <div className="pb-10">
        <Header goBack />
        {isLoading && <LoadingSpinner />}
        {!isLoading && <PostItem {...postData} />}
        {isFetching ? <p>Loading...</p> : null}
        {posts &&
          posts.pages.map(page => (
            <React.Fragment key={page.nextId ?? "lastPage"}>
              {page.posts.map((look: LookbookData) => (
                <PostItem key={look.id} {...look} />
              ))}
            </React.Fragment>
          ))}
      </div>
      <span ref={ref} onClick={() => fetchNextPage()}>
        intersection observer marker
      </span>
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
