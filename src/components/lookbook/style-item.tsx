import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Link from "next/link";

interface StyleListProps {
  styleList: {
    id: number;
    username: string;
  };
}

const StyleItem: NextPage<StyleListProps> = ({ styleList }) => {
  return (
    <li className="flex h-[220px] w-[196px] items-center justify-center">
      <Link href={`style/${styleList.username}-${styleList.id}`}>
        <div className="relative h-[190px] w-40 bg-slate-200 p-3">
          <div className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
            <Icon icon="icon-park-outline:like" className="text-lg" />
          </div>
          <p className="absolute bottom-3">@{styleList.username}</p>
        </div>
      </Link>
    </li>
  );
};

export default StyleItem;
