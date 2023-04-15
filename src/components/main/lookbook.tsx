import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LookbookData, LookbookDataMin } from "../../types/data-type";
import { apiGet } from "../../utils/request";
import MainLookBookItem from "./lookbook-item";

const MainLookbook: NextPage = () => {
  const { data: lookbooks } = useQuery("lookbooks", apiGet.GET_LOOKS, {
    suspense: true,
  });

  const [sortingLookbook, setSortingLookBook] = useState<LookbookData[]>([]);

  const sorting = () => {
    const newArray = lookbooks.sort(
      (a: { fav: string }, b: { fav: string }) => b.fav.length - a.fav.length,
    );
    return newArray;
  };

  useEffect(() => {
    const newArray = sorting();
    setSortingLookBook(newArray);
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h2 className="px-5 text-xl">Look Book</h2>
        <p className="px-5 text-textColor-gray-100">회원 스타일 피드</p>
      </div>
      <div className="border border-t-common-black border-b-common-black">
        <ul className="flex overflow-x-scroll">
          {sortingLookbook.map((look: LookbookDataMin) => (
            <MainLookBookItem key={look.id} {...look} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainLookbook;
