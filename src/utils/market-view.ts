import { apiPost } from "./request";

interface Views {
  id: number;
  view: Set<number> | number[];
}

export const updateViews = (
  userId: number,
  productId: number,
  currentView: number,
) => {
  const GET_VIEWLIST =
    typeof window === "undefined"
      ? undefined
      : localStorage.getItem("panda-market");
  const SET_VIEWLIST = (localData: Views[]) =>
    typeof window === "undefined"
      ? undefined
      : localStorage.setItem("panda-market", JSON.stringify(localData));

  const setLocalStorage = (data: Views[]) => SET_VIEWLIST(data);

  const dbUpdate = async () =>
    await apiPost.UPDATE_VIEWS(productId, { currentView });

  const productLog = JSON.parse(GET_VIEWLIST as string);

  const isUserExisted = productLog?.some((item: Views) => item.id === userId);

  let isProductExisted;

  if (!GET_VIEWLIST) {
    const viewCount = [{ id: userId, view: [productId] }];
    setLocalStorage(viewCount);
    dbUpdate();
    return;
  }

  if (!isUserExisted) {
    const viewCount = [...productLog, { id: userId, view: [productId] }];
    setLocalStorage(viewCount);
    dbUpdate();
    return;
  }

  productLog?.forEach((item: Views) => {
    if (item.id === userId)
      isProductExisted = [...item.view].includes(productId);
  });

  if (isProductExisted) return;

  const viewCount: Views[] = productLog?.map((item: Views) => {
    if (item.id === userId) {
      const view = [...item.view, productId];
      return { id: userId, view };
    } else {
      return item;
    }
  });

  setLocalStorage(viewCount);
  dbUpdate();
};
