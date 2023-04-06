import axios from "axios";

interface Views {
  user: string;
  product: number[];
}

export const updateViews = async (
  userEmail: string,
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

  const productLog = JSON.parse(GET_VIEWLIST as string);

  const viewProducts = productLog?.map((item: Views) => {
    if (item.user === userEmail) return item.product;
  });

  if (!GET_VIEWLIST) {
    const localData = [
      {
        user: userEmail,
        product: [productId],
      },
    ];
    SET_VIEWLIST(localData);
    await axios.post(`/api/products/${productId}`, { currentView });
    return;
  }

  const isExisted = viewProducts[0]?.indexOf(productId) !== -1 ? true : false;

  if (!isExisted) {
    const localData = productLog.map((item: Views) =>
      item.user === userEmail
        ? { ...item, product: [...viewProducts[0], productId] }
        : item,
    );

    SET_VIEWLIST(localData);
    await axios.post(`/api/products/${productId}`, { currentView });
  }
};
