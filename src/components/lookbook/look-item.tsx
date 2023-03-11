import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { LookbookData } from "../../types/data-type";

const LookItem: NextPage<LookbookData> = ({ user, imgurl, id }) => {
  return (
    <li className="flex h-[220px] items-center justify-center">
      <Link href={`lookbook/${id}`}>
        <div className="relative h-[175px] w-36 bg-slate-200">
          <Image
            src={imgurl[0]?.img}
            width={160}
            height={190}
            alt={`룩북 썸네일 이미지${id}`}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
            <Icon
              icon="icon-park-outline:like"
              className="text-lg transition duration-100 hover:text-xl"
            />
          </div>
        </div>
        <p className="text-common-black">@{user.nickname}</p>
      </Link>
    </li>
  );
};

export default LookItem;
