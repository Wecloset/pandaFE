import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../recoil/user";
import { LookbookData, UserData } from "../../../types/data-type";
import ImageSlide from "../../market/detail/image-slide";
import TagItem from "./tag-item";

interface PostItemProps extends LookbookData {
  setInput: (postId: number, val?: boolean) => void;
  updateComment: (commentId: number, text: string) => void;
  deleteComment: (commentId: number) => void;
  currentUser?: UserData;
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
  setInput,
}) => {
  const userData = useRecoilValue(currentUserState) as UserData;
  const { nickname: currentUserNickname } = userData;
  const { id: currentUserId } = userData;
  const [showComment, setShowComment] = useState<boolean>(false);
  const [isFavActive, setIsFavActive] = useState<boolean>(false);

  useEffect(() => {
    fav?.forEach((item: { userId: number }) => {
      item.userId === currentUserId && setIsFavActive(true);
    });
  }, []);

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
            <div>좋아요 {fav?.length ?? 0}</div>
          </div>
          <p className="mb-2">
            <span className="mr-2">{description}</span>
            {hashTag?.map(({ tag }, i) => (
              <span key={`태그${i}`} className="mr-1">
                {tag !== "" && `#${tag}`}
              </span>
            ))}
          </p>
          <span
            className="cursor-pointer text-commom-gray hover:underline"
            onClick={() => setShowComment(true)}
          >
            댓글 {comment ? comment.length : 0}개
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-3 text-2xl [&>svg]:cursor-pointer">
          <Icon icon="ci:chat-circle" onClick={() => setInput(id, true)} />
          {isFavActive ? (
            <Icon icon="icon-park-solid:like" color="#ff5252" />
          ) : (
            <Icon icon="icon-park-outline:like" />
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
                    <div className="flex gap-3">
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
