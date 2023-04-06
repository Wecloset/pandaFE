import { Icon } from "@iconify/react";
import { NextPage } from "next";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import Header from "../../components/ui/header";
import LoadingSpinner from "../../components/ui/loading-spinner";
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
import useModal from "../../hooks/useModal";
import { apiGet, apiPost } from "../../utils/request";

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

  const { Modal, setModalState, show } = useModal();

  const [showInput, setShowInput] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [commentId, setCommentId] = useState<number>(0);

  const { data: postData, isLoading } = useQuery<LookbookData>(
    "getPost",
    () => apiGet.GET_POST(lookbookId as string),
    {
      enabled: !!lookbookId,
      notifyOnChangeProps: "tracked",
    },
  );

  const getAllPost = ({ pageParam = "" }: { pageParam: string }) => {
    const response = apiPost.GET_ALL_POST(lookbookId as string, pageParam);
    return response;
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
  };

  const submitComment = async (comment?: string) => {
    const payload = { comment, userId };
    const response = !isUpdating
      ? await apiPost.CREATE_COMMENT(postId, payload)
      : await apiPost.UPDATE_COMMENT(commentId, payload);
    return response;
  };

  const { mutate: commentMutate, isLoading: loadingComment } = useMutation(
    "comment",
    submitComment,
    {
      onSuccess: ({ message }) => {
        queryClient.invalidateQueries("getPost");
        reset();
      },
      onError: () => {
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

  const setInput = (postId: number, val?: boolean) => {
    reset();
    setShowInput(val as boolean);
    setPostId(postId);
  };

  const submit = async (data: FieldValues) => {
    if (!data?.comment) {
      commentMutate(undefined);
      return;
    }
    if (data.comment.trim === "") return;
    commentMutate(data.comment);
  };

  const deleteComment = (commentId: number) => {
    setModalState({
      message: "댓글을 삭제할까요?",
      btnText: "삭제",
      cancel: reset,
      submit: submit,
    });
    setIsUpdating(true);
    setCommentId(commentId);
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
            isModal={show}
            modal={<Modal />}
            setModal={setModalState}
            updateComment={updateComment}
            deleteComment={deleteComment}
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
                  isModal={show}
                  modal={<Modal />}
                  setModal={setModalState}
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
