import { ProductData } from "../types/data-type";

export const random = (productData: ProductData[]) => {
  const items = productData.slice();
  const itemList = [];
  const LIMIT = 4;
  let randomIdx, randomItem;
  for (let i = 0; i < LIMIT; i++) {
    randomIdx = Math.floor(Math.random() * items.length);
    randomItem = items.splice(randomIdx, 1);
    itemList.push(...randomItem);
  }
  return itemList;
};
