import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import useFav from "../../hooks/useFav";
import { LookbookData } from "../../types/data-type";
import { setModalProps } from "../../types/modal-type";

interface LookItemProps extends LookbookData {
  userId: number;
  setModal: setModalProps;
}

const LookItem: NextPage<LookItemProps> = ({
  user,
  imgurl,
  id,
  fav,
  userId,
  setModal,
}) => {
  const router = useRouter();
  const goLoginPage = () => router.push("/login");

  const { isFavActive, updateFav, changeButtonSytle, initialButtonStyle } =
    useFav(userId);

  const { mutate } = useMutation(updateFav, {
    onSuccess: ({ data }) => {
      console.log(data.message);
    },
    onError: ({ response }) => {
      console.log(response.data.message);
    },
  });

  const toggleFavButton = async () => {
    if (userId === 0) {
      setModal({
        message: "로그인 후 이용 가능합니다.,로그인페이지로 이동할까요?",
        btnText: "로그인 하기",
        submit: goLoginPage,
      });
      return;
    }
    changeButtonSytle();
    mutate({ currentUserId: userId, lookId: id });
  };

  useEffect(() => {
    if (!fav) return;
    initialButtonStyle(fav);
  }, [fav]);

  return (
    <li className="flex h-[220px] justify-center border-b border-r border-common-black pt-4">
      <div className="relative h-[175px] w-36">
        <Link href={`lookbook/${id}`}>
          <div className="h-[175px] w-36 bg-slate-200">
            <Image
              src={imgurl[0]?.img}
              width={160}
              height={190}
              alt={`룩북 썸네일 이미지${id}`}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </Link>
        <p className="text-common-black">@{user.nickname}</p>
        <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
          {isFavActive ? (
            <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black">
              <Icon
                icon="icon-park-solid:like"
                color="#ff5252"
                className="border border-common-black text-lg"
                onClick={toggleFavButton}
              />
            </div>
          ) : (
            <Icon
              icon="icon-park-outline:like"
              className="cursor-pointer text-lg transition hover:scale-110"
              onClick={toggleFavButton}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default LookItem;
