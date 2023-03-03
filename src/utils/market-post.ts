import axios from "axios";

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/products");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getOneProduct = async (id: string | string[]) => {
  const productId = id;
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${productId}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateViewCount = async (
  productId: number,
  payload: { view: number },
) => {
  console.log("updating view count...");
  const response = await axios.post(`/api/products/${productId}/views`, {
    headers: { "Content-Type": "application/json" },
    payload,
  });
  console.log(response);
};

export const updateUserProduct = async (payload: {
  userId: number;
  productId: number;
  isLikeActive: boolean | null;
}) => {
  console.log("Updating fav...");
  const response = await axios.post(`/api/user/fav`, {
    headers: { "Content-Type": "application/json" },
    payload,
  });
  console.log(response);
};

export const getUserData = async (payload: { userEmail: string }) => {
  console.log("get user data...");
  const { data } = await axios.post(`/api/user`, {
    headers: { "Content-Type": "application/json" },
    payload,
  });
  return data;
};
