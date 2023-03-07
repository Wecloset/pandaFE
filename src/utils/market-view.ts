import { axiosPost } from "./services";

interface Views {
  user: string;
  product: number[];
}

const GET_VIEWLIST = localStorage.getItem("panda-market");
const SET_VIEWLIST = (localData: Views[]) =>
  localStorage.setItem("panda-market", JSON.stringify(localData));

export const updateViews = (
  userEmail: string,
  productId: number,
  currentView: number,
) => {
  const productLog = JSON.parse(GET_VIEWLIST as string);
  const viewProducts = productLog.map((item: Views) => {
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
    axiosPost(`/api/products/${productId}`, { currentView });
    return;
  }

  const isExisted = viewProducts[0].indexOf(productId) !== -1 ? true : false;

  if (!isExisted) {
    const localData = productLog.map((item: Views) =>
      item.user === userEmail
        ? { ...item, product: [...item.product, productId] }
        : item,
    );
    SET_VIEWLIST(localData);
    axiosPost(`/api/products/${productId}`, { currentView });
  }
};
