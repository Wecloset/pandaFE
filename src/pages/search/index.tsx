import { Icon } from "@iconify/react";
import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Header from "../../components/ui/header";
import MainProduct from "../../components/main/product-item";
import useToast from "../../hooks/useToast";
import { ProductDataMin } from "../../types/data-type";

interface KeywordInterface {
  id: number;
  tag: string;
}

const Search: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  const { setToast, Toast } = useToast();

  const [keywords, setKeywords] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState<string | undefined | string[]>(
    "",
  );

  const [searchData, setSearchData] = useState<ProductDataMin[]>([]);

  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);

  const [focus, setFocus] = useState<boolean>(false);

  // ------------------------------------------------------------------------------------
  const CACHE_KEY = "recentSearches";
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    if (session.status !== "unauthenticated") {
      caches.open(`my-cache-${session.data?.user?.name}`).then(cache => {
        cache.match(CACHE_KEY).then(response => {
          if (response) {
            response.json().then(data => {
              setSearches(data);
            });
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (session.status !== "unauthenticated") {
      caches.open(`my-cache-${session.data?.user?.name}`).then(cache => {
        const expirationDate = new Date().getTime() + EXPIRATION_TIME;
        const cacheHeaders = new Headers({
          "Content-Type": "application/json",
          Expires: new Date(expirationDate).toUTCString(),
        });
        const cacheOptions = {
          headers: cacheHeaders,
        };
        cache.put(
          new Request(CACHE_KEY),
          new Response(JSON.stringify(searches), cacheOptions),
        );
      });
    }
  }, [searches]);

  // ------------------------------------------------------------------------------------

  useEffect(() => {
    const enteredWord = router.query.word as string;
    if (enteredWord === undefined) return;
    setInputValue(enteredWord);
    setSearches([enteredWord, ...searches]);

    refetch();
  }, [router.query.word]);

  useQuery("taglist", async () => {
    const { data } = await axios.get("/api/search/hashtag");
    setKeywords(data.allHashTags.map((x: KeywordInterface) => x.tag));
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            onBlur={() => setFocus(false)}
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
        <div>
          {router.asPath === "/search" && !focus ? (
            <>
              <div className="mt-6">
                <h2 className="mb-5 text-base font-bold">추천 검색어</h2>
                <ul className="flex cursor-pointer flex-wrap gap-5 py-1 text-3xl">
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
                {session.status !== "unauthenticated" && (
                  <ul className="cursor-pointer space-y-2 text-lg text-textColor-gray-50">
                    <>
                      {searches.map((query, index) => (
                        <li
                          className="flex items-center justify-between"
                          key={query}
                        >
                          <span className="text-common-black">{query}</span>
                          <Icon
                            icon="ic:baseline-clear"
                            aria-label="검색어 삭제"
                            onClick={() => {
                              const newSearches = [...searches];
                              newSearches.splice(index, 1);
                              setSearches(newSearches);
                            }}
                          />
                        </li>
                      ))}
                    </>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {searchData.length === 0 && !isLoading ? (
                <li>검색결과가 없습니다</li>
              ) : !focus ? (
                searchData.map(data => (
                  <MainProduct
                    key={data.id}
                    {...data}
                    imgw="w-full"
                    imgh="h-[190px]"
                  />
                ))
              ) : (
                ""
              )}
            </ul>
          )}
          {focus &&
            matchedKeywords.length > 0 &&
            matchedKeywords.length !== keywords.length && (
              <div>
                <ul className="pt-5">
                  {matchedKeywords.map(keyword => (
                    <li
                      key={keyword}
                      className="flex h-12 w-full cursor-pointer items-center gap-2 overflow-hidden p-2 pt-2 text-lg"
                      onMouseDown={() => {
                        searchKeyword(keyword);
                      }}
                    >
                      <Icon
                        icon="ion:search-sharp"
                        className="text-common-gray"
                        aria-label="검색하기"
                      />
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Search;
