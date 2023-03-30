import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import useFav from "../../../hooks/useFav";
import { LookbookData, UserData } from "../../../types/data-type";
import { ModalProps } from "../../../types/modal-type";
import ImageSlide from "../../market/detail/image-slide";
import TagItem from "./tag-item";

interface PostItemProps extends LookbookData {
  userData: UserData;
  setInput: (postId: number, val?: boolean) => void;
  updateComment: (commentId: number, text: string) => void;
  deleteComment: (commentId: number) => void;
  isModal: boolean;
  modal: React.ComponentType | JSX.Element;
  setModal: ({ message, cancel, submit, btnText }: ModalProps) => void;
}

const PostItem: NextPage<PostItemProps> = ({
  userData,
  id,
  user,
  imgurl,
  fav,
  description,
  hashTag,
  product,
  comment,
  updateComment,
  deleteComment,
  isModal,
  setInput,
  modal,
  setModal,
}) => {
  const currentUserNickname = userData ? userData.nickname : "";
  const currentUserId = userData ? userData.id : 0;
  const {
    isFavActive,
    favCount,
    updateFav,
    changeCount,
    changeButtonSytle,
    updateFavCount,
    initialButtonStyle,
  } = useFav(currentUserId);

  const router = useRouter();

  const [showComment, setShowComment] = useState<boolean>(false);

  const { mutate } = useMutation(updateFav, {
    onSuccess: ({ data }) => {
      console.log(data.message);
      changeCount();
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const goLoginPage = () => router.push("/login");

  const clickComment = () => {
    if (!currentUserId) {
      setModal({
        message: "로그인 후 이용할 수 있습니다.,로그인페이지로 이동할까요?",
        btnText: "로그인 하기",
        submit: goLoginPage,
      });
      return;
    }
    setInput(id, true);
  };

  const toggleFavButton = async () => {
    if (currentUserId === 0) {
      setModal({
        message: "로그인 후 이용할 수 있습니다.,로그인페이지로 이동할까요?",
        btnText: "로그인 하기",
        submit: goLoginPage,
      });
      return;
    }
    changeButtonSytle();
    mutate({ currentUserId, lookId: id });
  };

  useEffect(() => {
    if (!fav) return;
    updateFavCount(fav.length);
    initialButtonStyle(fav);
  }, [fav]);

  return (
    <>
      {isModal && modal}
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
          <div className="mb-3 flex gap-2 text-xs text-common-gray">
            <div>2023.03.11</div>
            <div>좋아요 {favCount}</div>
          </div>
          {(description || hashTag[0]?.tag !== "") && (
            <p className="mb-2">
              {description && <span className="mr-2">{description}</span>}
              {hashTag?.map(({ tag }, i) => (
                <span key={`태그${i}`} className="mr-1">
                  {tag !== "" && `#${tag}`}
                </span>
              ))}
            </p>
          )}
          <span
            className="cursor-pointer text-common-gray hover:underline"
            onClick={() => setShowComment(true)}
          >
            댓글 {comment ? comment.length : 0}개
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-3 text-2xl [&>svg]:cursor-pointer">
          <Icon icon="ci:chat-circle" onClick={clickComment} />
          {isFavActive ? (
            <Icon
              icon="icon-park-solid:like"
              color="#ff5252"
              onClick={toggleFavButton}
            />
          ) : (
            <Icon icon="icon-park-outline:like" onClick={toggleFavButton} />
          )}
        </div>
        {showComment && comment?.length > 0 && (
          <div className="py-4">
            <div>
              <h2 className="mr-2 inline-block text-lg">comments</h2>
              <span className="text-base font-bold">{comment?.length}</span>
            </div>
            <ul className="mt-3">
              {comment?.map(({ id, author, text }, i) => (
                <li key={`코멘트${i}`} className="flex justify-between">
                  <div className="flex gap-3">
                    <b className="text-base font-bold">{author.nickname}</b>
                    {text}
                  </div>
                  {author.nickname == currentUserNickname && (
                    <div className="flex gap-3 text-textColor-gray-100">
                      <button onClick={() => updateComment(id, text)}>
                        수정
                      </button>
                      <button onClick={() => deleteComment(id)}>삭제</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {product.length > 0 && (
          <div className="mt-3 border-t border-borderColor-gray">
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
