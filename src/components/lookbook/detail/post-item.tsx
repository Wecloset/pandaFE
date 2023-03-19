import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import useFav from "../../../hooks/useFav";
import { currentUserState } from "../../../recoil/user";
import { LookbookData, UserData } from "../../../types/data-type";
import ImageSlide from "../../market/detail/image-slide";
import TagItem from "./tag-item";

interface PostItemProps extends LookbookData {
  setInput: (postId: number, val?: boolean) => void;
  updateComment: (commentId: number, text: string) => void;
  deleteComment: (commentId: number) => void;
  submit: (data: FieldValues) => void;
  reset: () => void;
  modal: boolean;
}

const PostItem: NextPage<PostItemProps> = ({
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
  modal,
  setInput,
  submit,
  reset,
}) => {
  const userData = useRecoilValue(currentUserState) as UserData;
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

  const clickComment = () => {
    if (!currentUserId) return alert("로그인 후 이용가능합니다.");
    setInput(id, true);
  };

  const toggleFavButton = async () => {
    if (currentUserId === 0) return alert("로그인 후 이용가능합니다.");
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
      {modal && (
        <div className="fixed top-1/2 left-1/2 z-50 w-52 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white text-center shadow-md">
          <p className="py-4">댓글을 삭제할까요?</p>
          <div className="flex w-full divide-x border-t">
            <button
              onClick={submit}
              className="w-1/2 cursor-pointer py-2 hover:rounded-bl-lg hover:bg-slate-100"
            >
              삭제
            </button>
            <button
              onClick={reset}
              className="w-1/2 cursor-pointer py-2 hover:rounded-br-lg hover:bg-slate-100"
            >
              취소
            </button>
          </div>
        </div>
      )}
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
