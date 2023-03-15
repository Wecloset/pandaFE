import { Icon } from "@iconify/react";
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { LookbookData, UserData } from "../../types/data-type";

interface LookItemProps extends LookbookData {
  currentUser: UserData;
}

const LookItem: NextPage<LookItemProps> = ({
  user,
  imgurl,
  id,
  fav,
  currentUser,
}) => {
  const { id: currentUserId } = currentUser;
  const [isFavActive, setIsFavActive] = useState<boolean>(false);

  const updateFav = async (payload: {
    currentUserId: number;
    lookId?: number;
    productId?: number;
  }) => {
    const { currentUserId, productId, lookId } = payload;
    const data = axios.post(`/api/user/fav`, {
      currentUserId,
      lookId,
    });
    return data;
  };

  const { mutate } = useMutation(updateFav, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const toggleFavButton = async () => {
    setIsFavActive(prev => !prev);
    mutate({ currentUserId, lookId: id });
  };

  useEffect(() => {
    fav?.forEach((item: { userId: number }) => {
      item.userId === currentUserId && setIsFavActive(true);
    });
  }, []);

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
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black ">
              <Icon
                icon="icon-park-solid:like"
                color="#ff5252"
                className=" border border-common-black text-lg"
                onClick={toggleFavButton}
              />
            </div>
          ) : (
            <Icon
              icon="icon-park-outline:like"
              className="text-lg"
              onClick={toggleFavButton}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default LookItem;
