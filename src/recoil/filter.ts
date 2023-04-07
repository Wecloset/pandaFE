import { atom, selector, selectorFamily } from "recoil";
import { v1 } from "uuid";
import { MainProductData } from "../types/data-type";
import { priceMapping, priceWord } from "../utils/price-mapping";
import { apiGet } from "../utils/request";

const categoryNameState = atom<string>({
  key: `categoryName/${v1()}`,
  default: "전체",
});

const isRentState = atom<boolean | "">({
  key: `isRent/${v1()}`,
  default: "",
});

const wordListState = atom<string[]>({
  key: `wordList/${v1()}`,
  default: [],
});

const marketDataQuery = selector({
  key: `marketQuery/${v1()}`,
  get: async () => {
    const response = await apiGet.GET_ITEMS();
    if (response.err) throw response.error;
    return response;
  },
});

const filteredListState = selectorFamily({
  key: `filterList/${v1()}`,
  get:
    (categoryName: string) =>
    ({ get }) => {
      const filteredList = get(marketDataQuery);

      if (filteredList.error) return;

      switch (categoryName) {
        case "전체":
          return filteredList;
        default:
          return filteredList.filter(
            ({ category }: { category: string }) => category === categoryName,
          );
      }
    },
});

const filteredMarketListState = selector({
  key: `filteredMarketListState/${v1()}`,
  get: ({ get }) => {
    const category = get(categoryNameState);
    const isRent = get(isRentState);
    const wordList = get(wordListState);

    let filteredList = get(filteredListState(category)); // 카테고리로 필터링된 목록
    let styleList: MainProductData[] = []; // 선택한 스타일로 필터링된 목록
    let price = "";

    if (wordList.length > 0) {
      wordList.forEach(word => {
        if (
          word === priceWord["LOW"] ||
          word === priceWord["MEDIUM"] ||
          word === priceWord["HIGH"]
        ) {
          price = word; // 단어가 가격이면 price로 분류해둔다.
        } else {
          const styles = filteredList.filter(
            ({ style }: { style: string }) => style === word,
          );
          styleList = [...styleList, ...styles];
        }
      });

      if (styleList.length > 0 || (styleList.length === 0 && price === ""))
        filteredList = styleList;

      // price필터링 : 선택한 category, style에 해당하면서 가격이 맞는것.
      if (price !== "")
        filteredList = filteredList.filter((product: MainProductData) =>
          priceMapping(product.price, price),
        );
    }

    // rent필터링 : 선택한 category, style, price에 해당하면서 대여가능 여부를 나눔.
    if (isRent !== "")
      filteredList = isRent
        ? filteredList.filter(({ rental }: { rental: boolean }) => rental)
        : filteredList.filter(({ rental }: { rental: boolean }) => !rental);

    return filteredList;
  },
});

export {
  categoryNameState,
  isRentState,
  wordListState,
  marketDataQuery,
  filteredListState,
  filteredMarketListState,
};
