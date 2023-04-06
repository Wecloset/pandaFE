import { useCallback, useState } from "react";
import { apiPost } from "../utils/request";

interface Fav {
  id: number;
  productId: number;
  userId: number;
}

const useFav = (currentUserId: number) => {
  const [isFavActive, setIsFavActive] = useState<boolean>(false);
  const [favCount, setFavCount] = useState<number>(0);

  const updateFav = useCallback(
    async (favConfig: {
      currentUserId: number;
      lookId?: number;
      productId?: number;
    }) => {
      const { currentUserId, productId, lookId } = favConfig;
      const payload = productId ? { productId } : { lookId };

      const data = apiPost.UPDATE_USER(currentUserId, payload);
      return data;
    },
    [],
  );

  const changeButtonSytle = () => setIsFavActive(prev => !prev);

  const changeCount = () => {
    isFavActive ? setFavCount(prev => prev - 1) : setFavCount(prev => prev + 1);
  };

  const updateFavCount = (count: number) => setFavCount(count);

  const initialButtonStyle = (fav: Fav[]) => {
    fav.forEach((item: { userId: number }) => {
      item.userId === currentUserId && setIsFavActive(true);
    });
  };

  return {
    isFavActive,
    favCount,
    updateFav,
    changeCount,
    changeButtonSytle,
    updateFavCount,
    initialButtonStyle,
  };
};

export default useFav;
