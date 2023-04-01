import { Icon } from "@iconify/react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Header from "../../components/ui/header";
import MainProduct from "../../components/main/product-item";
import useToast from "../../hooks/useToast";

interface KeywordInterface {
  id: number;
  tag: string;
}

const Search: NextPage = () => {
  const router = useRouter();

  const { setToast, Toast } = useToast();

  const [keywords, setKeywords] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState<string | undefined | string[]>(
    "",
  );
  const [searchData, setSearchData] = useState<string[]>([]);

  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);

  const [focus, setFocus] = useState<boolean>(false);

  // ------------------------------------------------------------------------------------
  const CACHE_KEY = "recentSearches";

  const [searches, setSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load saved searches from cache storage when the component mounts
    caches.open("my-cache").then(cache => {
      cache.match(CACHE_KEY).then(response => {
        if (response) {
          response.json().then(data => {
            setSearches(data);
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    // Save searches to cache storage whenever they change
    caches.open("my-cache").then(cache => {
      cache.put(new Request(CACHE_KEY), new Response(JSON.stringify(searches)));
    });
  }, [searches]);

  // ------------------------------------------------------------------------------------

  useEffect(() => {
    setInputValue(router.query.word);
    refetch();
  }, [router.query.word]);

  useQuery("taglist", async () => {
    const { data } = await axios.get("/api/search/hashtag");
    setKeywords(data.allHashTags.map((x: KeywordInterface) => x.tag));
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    const matched = keywords.filter(keyword =>
      keyword.toLowerCase().includes(value),
    );
    setMatchedKeywords(matched);
    setFocus(true);
  };

  const { refetch, isLoading } = useQuery(
    ["getProduct", router.query.word],
    async () => {
      const { data } = await axios.get(
        `/api/search?keyword=${router.query.word}`,
      );
      return data;
    },
    {
      onSuccess: data => {
        setSearchData(data);
      },
      onError: ({ message }) => {
        setToast(message, true);
      },
    },
  );

  const searchKeyword = async (keyword: string) => {
    router.push({
      pathname: router.pathname,
      query: { word: keyword },
    });
    setFocus(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { word: inputValue },
    });
    setSearches([searchQuery, ...searches]);
    setSearchQuery("");
    setFocus(false);
  };

  return (
    <>
      <Header text="SEARCH" goBack />
      <Toast />
      <div className="px-5 py-5">
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={inputValue || ""}
            onChange={handleInputChange}
            onFocus={() => setFocus(true)}
            className="h-12 w-full border-b border-common-black py-2 pl-[10px] pr-10"
          />
          <Icon
            icon="mdi:close-circle-outline"
            className="absolute right-3 cursor-pointer text-xl text-textColor-gray-100"
            onClick={() => {
              setInputValue(""), setMatchedKeywords([]), setSearchData([]);
            }}
          />
        </form>
        {focus ? (
          <div>
            {matchedKeywords.length > 0 &&
              matchedKeywords.length !== keywords.length && (
                <ul className="pt-5">
                  {matchedKeywords.map(keyword => (
                    <li
                      key={keyword}
                      className="flex h-12 w-full items-center overflow-hidden bg-red-50 p-2 pt-2 text-xl"
                      onClick={() => searchKeyword(keyword)}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ) : router.asPath === "/search" ? (
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
                {searches.map(query => (
                  <li className="flex items-center" key={query}>
                    {query}
                    <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {searchData.length === 0 && !isLoading ? (
              <li>검색결과가 없습니다</li>
            ) : (
              searchData.map((data: any) => (
                <MainProduct
                  key={data.id}
                  {...data}
                  imgw="w-full"
                  imgh="h-[190px]"
                />
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
