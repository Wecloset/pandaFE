import { Icon } from "@iconify/react";
import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import Button from "../../components/button";
import Header from "../../components/header";

interface KeywordInterface {
  id: number;
  tag: string;
}

const Search: NextPage = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [focus, setFocus] = useState<boolean>(false);

  const {} = useQuery("taglist", async () => {
    const { data } = await axios.get("/api/search/keywords");
    setKeywords(data.map((x: KeywordInterface) => x.tag));
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    const matched = keywords.filter(keyword =>
      keyword.toLowerCase().includes(value),
    );
    setMatchedKeywords(matched);
  };
  return (
    <>
      <Header text="SEARCH" goBack />
      <div className="px-5 py-5">
        <form className="relative flex items-center">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="h-12 w-full border-b border-common-black py-2 pl-[10px] pr-10"
          />
          <Icon
            icon="mdi:close-circle-outline"
            className="absolute right-3 cursor-pointer text-xl text-textColor-gray-100"
            onClick={() => {
              setInputValue(""), setMatchedKeywords([]);
            }}
          />
        </form>

        {focus ? (
          <div>
            {matchedKeywords.length > 0 &&
              matchedKeywords.length !== keywords.length && (
                <ul className="pt-5">
                  {matchedKeywords.map(keyword => (
                    <li key={keyword} className="pt-2">
                      <div className="flex h-12 w-full items-center overflow-hidden bg-red-50 p-2 text-xl">
                        {keyword}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ) : (
          <div>
            <div className="mt-6">
              <h2 className="mb-5 text-base font-bold">추천 검색어</h2>
              <ul className="flex flex-wrap gap-5 text-[34px] [&>li]:cursor-pointer [&>li]:py-1">
                <li>#샤넬</li>
                <li>#구찌</li>
                <li>#COS</li>
                <li>#Y2K</li>
                <li>#NIKE</li>
                <li>#ACNE STUDIOS</li>
              </ul>
            </div>
            <div className="mt-12">
              <h2 className="mb-3 text-base font-bold">최근 검색어</h2>
              <ul className="space-y-2 [&_svg]:-mt-0.5 [&_svg]:ml-2 [&_svg]:cursor-pointer [&_svg]:text-lg [&_svg]:text-textColor-gray-50">
                <li className="flex items-center">
                  하이엔드
                  <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
                </li>
                <li className="flex items-center">
                  스투시
                  <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
                </li>
                <li className="flex items-center">
                  빈티지
                  <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
