import axios from "axios";
import { SignProps } from "../components/sign/sign-form";

const client = axios.create({
  headers: { "Content-Type": "application/json" },
});

const axiosPost = async <T>(url: string, payload: T) => {
  const { data } = await client.post(url, payload);
  return data;
};

const axiosGet = async (url: string) => {
  const { data } = await client.get(url);
  return data;
};

const axiosDelete = async (id: string) => {
  const data = await client.delete(`/api/user/${id}`);
  return data;
};

const apiGet = {
  GET_ITEMS: () => axiosGet("/api/products"),

  GET_LOOKS: () => axiosGet("/api/look"),

  GET_ITEM: (id: string) => axiosGet(`/api/products/${id}`),

  GET_POST: (id: string) => axiosGet(`/api/look/${id}`),

  GET_USER: (queryKey: string) => axiosGet(`/api/user?email=${queryKey}`),

  SEARCH: (searchKey: string) => axiosGet(`/api/search?keyword=${searchKey}`),

  SEARCH_HASHTAG: () => axiosGet("/api/search/hashtag"),
};

const apiPost = {
  CREATE_USER: (data: SignProps) => axiosPost("/api/auth/sign", data),

  CREATE_ITEM: <T extends object>(data: T) => axiosPost("/api/products", data),

  CREATE_POST: <T extends object>(data: T) => axiosPost("/api/look", data),

  CREATE_TAG: (data: string[], queryKey: number) =>
    axiosPost(`/api/user/tag?post=${queryKey}`, data),

  CREATE_NICKNAME: (data: { nickname: string }) =>
    axiosPost("/api/user/nickname", data),

  CREATE_PROFILE: <T extends object>(data: T) =>
    axiosPost("/api/auth/profile", data),

  CREATE_COMMENT: (id: number, data: { comment: any; userId: number }) =>
    axiosPost(`/api/look/comment?postId=${id}`, data),

  UPDATE_USER: (
    queryKey: number,
    data: { productId: number } | { lookId: number | undefined },
  ) => axiosPost(`/api/user/${queryKey}`, data),

  UPDATE_NICKNAME: (id: string, data: { nickname: string }) =>
    axiosPost(`/api/user/nickname?id=${id}`, data),

  UPDATE_COMMENT: (id: number, data: { comment: any; userId: number }) =>
    axiosPost(`/api/look/comment?commentId=${id}`, data),

  UPDATE_VIEWS: (id: number, view: { currentView: number }) =>
    axiosPost(`/api/products/${id}`, view),

  UPDATE_TAG: (id: number, tags: string[]) =>
    axiosPost(`/api/user/tag?update=${id}`, tags),

  UPDATE_PROFILE: (data: { imageurl: string; userData: number }) =>
    axiosPost("/api/user/image", data),

  GET_ALL_POST: (id: string, pageParam: string) =>
    axiosPost(`/api/look/post?cursor=${pageParam}`, { lookbookId: id }),
};

export { apiGet, apiPost, axiosDelete };
