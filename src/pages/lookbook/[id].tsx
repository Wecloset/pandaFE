import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loading-spinner";
import PostItem from "../../components/lookbook/detail/post-item";
import { LookbookData, UserData } from "../../types/data-type";
import { axiosGet } from "../../utils/services";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/user";

const Post: NextPage = () => {
  const router = useRouter();
  const { id: lookbookId } = router.query;
  const { ref, inView } = useInView();
  const { register, handleSubmit } = useForm();
  const userData = useRecoilValue(currentUserState) as UserData;
  const { id: userId } = userData;

  const [showInput, setShowInput] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [commentId, setCommentId] = useState<number>(0);

  const submitComment = async (comment?: string) => {
    const payload = { comment, userId };
    const url = isUpdating
      ? `/api/look/comment?commentId=${commentId}`
      : `/api/look/comment?postId=${postId}`;

    const { data } = await axios.post(url, payload);
    return data;
  };

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

  const { mutate, isLoading: loadingComment } = useMutation(
    "comment",
    submitComment,
    {
      onSuccess: ({ message }) => {
        alert(message);
        setShowInput(false);
        setCommentValue("");
      },
      onError: ({ response }) => {
        alert(response.data.message);
      },
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const updateComment = (commentId: number, text: string) => {
    setCommentValue(text);
    setCommentId(commentId);
    setShowInput(true);
    setIsUpdating(true);
  };

  const deleteComment = (commentId: number) => {
    setCommentId(commentId);
    mutate(undefined);
  };

  const setInput = (postId: number, val?: boolean) => {
    setShowInput(val as boolean);
    setPostId(postId);
  };

  const submit = async (data: FieldValues) => {
    if (data.comment.trim === "") return;
    mutate(data.comment);
  };

  return (
    <div>
      <div className="pb-10">
        <Header goBack />
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <PostItem
            setInput={setInput}
            updateComment={updateComment}
            deleteComment={deleteComment}
            {...postData}
          />
        )}
        {!isFetching &&
          posts?.pages.map(page => (
            <React.Fragment key={page.nextId ?? "lastPage"}>
              {page.posts.map((look: LookbookData) => (
                <PostItem
                  key={look.id}
                  setInput={setInput}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  {...look}
                />
              ))}
            </React.Fragment>
          ))}
      </div>
      {hasNextPage && (
        <span ref={ref}>
          <LoadingSpinner />
        </span>
      )}
      {showInput && (
        <form
          onSubmit={handleSubmit(submit)}
          className="fixed bottom-0 z-10 flex h-[60px] w-[390px] items-center justify-between border-t border-borderColor-gray bg-white px-5"
        >
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            {...register("comment", { value: commentValue })}
          />
          <Icon
            icon="tabler:mood-smile"
            className="cursor-pointer text-xl text-textColor-gray-100"
          />
        </form>
      )}
    </div>
  );
};

export default Post;
