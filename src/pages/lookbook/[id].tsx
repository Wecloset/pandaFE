import { Icon } from "@iconify/react";
import { NextPage } from "next";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loading-spinner";
import PostItem from "../../components/lookbook/detail/post-item";
import { LookbookData } from "../../types/data-type";
import { axiosGet } from "../../utils/services";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";
import { useRouter } from "next/router";

const Post: NextPage = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userInfo;
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    if (userContents) setUserId(userContents.id);
  }, [state]);

  const router = useRouter();
  const { id: lookbookId } = router.query;

  const queryClient = useQueryClient();

  const { ref, inView } = useInView();
  const { register, handleSubmit } = useForm();

  const [showInput, setShowInput] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [commentId, setCommentId] = useState<number>(0);
  const [confirm, setConfirm] = useState<boolean>(false);

  const getOnePost = async () => {
    try {
      const { data } = await axiosGet(`/api/look/${lookbookId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: postData, isLoading } = useQuery<LookbookData>(
    "getPost",
    getOnePost,
    {
      enabled: !!lookbookId,
      notifyOnChangeProps: "tracked",
    },
  );

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
      enabled: !!lookbookId,
      notifyOnChangeProps: "tracked",
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const reset = () => {
    setCommentValue("");
    setIsUpdating(false);
    setShowInput(false);
    setConfirm(false);
  };

  const submitComment = async (comment?: string) => {
    const payload = { comment, userId };
    const url = isUpdating
      ? `/api/look/comment?commentId=${commentId}`
      : `/api/look/comment?postId=${postId}`;

    const { data } = await axios.post(url, payload);
    return data;
  };

  const { mutate: commentMutate, isLoading: loadingComment } = useMutation(
    "comment",
    submitComment,
    {
      onSuccess: data => {
        alert(data.message);
        queryClient.invalidateQueries("getPost");
        reset();
      },
      onError: ({ response }) => {
        alert(response.data.message);
        reset();
      },
    },
  );

  const updateComment = (commentId: number, text: string) => {
    setCommentValue(text);
    setCommentId(commentId);
    setShowInput(true);
    setIsUpdating(true);
  };

  const deleteComment = (commentId: number) => {
    setConfirm(true);
    setIsUpdating(true);
    setCommentId(commentId);
  };

  const setInput = (postId: number, val?: boolean) => {
    reset();
    setShowInput(val as boolean);
    setPostId(postId);
  };

  const submit = async (data: FieldValues) => {
    if (!data.comment) {
      commentMutate(undefined);
      return;
    }
    if (data.comment.trim === "") return;
    commentMutate(data.comment);
  };

  return (
    <div>
      <div className="pb-10">
        <Header goBack />
        {isLoading && <LoadingSpinner />}
        {postData && (
          <PostItem
            userData={userContents}
            setInput={setInput}
            modal={confirm}
            submit={submit}
            updateComment={updateComment}
            deleteComment={deleteComment}
            reset={reset}
            {...postData}
          />
        )}
        {!isFetching &&
          posts?.pages.map(page => (
            <React.Fragment key={page?.nextId ?? "lastPage"}>
              {page?.posts.map((look: LookbookData) => (
                <PostItem
                  key={look.id}
                  userData={userContents}
                  setInput={setInput}
                  modal={confirm}
                  submit={submit}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  reset={reset}
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
            value={commentValue}
            {...register("comment", {
              onChange: e => setCommentValue(e.target.value),
            })}
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
