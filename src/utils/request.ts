import axios from "axios";

const client = axios.create({
  headers: { "Content-Type": "application/json" },
});

const axiosPost = async (url: string, payload: any) => {
  try {
    const { data } = await client.post(url, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const axiosGet = async (url: string) => {
  try {
    const { data } = await client.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
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
  CREATE_USER: (data: any) => axiosPost("/api/auth/sign", data),

  CREATE_ITEM: (data: any) => axiosPost("/api/products", data),

  CREATE_POST: (data: any) => axiosPost("/api/look", data),

  CREATE_TAG: (data: any, queryKey: number) =>
    axiosPost(`/api/user/tag?post=${queryKey}`, data),

  CREATE_NICKNAME: (data: any) => axiosPost("/api/user/nickname", data),

  CREATE_PROFILE: (data: any) => axiosPost("/api/auth/profile", data),

  CREATE_COMMENT: (id: number, data: any) =>
    axiosPost(`/api/look/comment?postId=${id}`, data),

  UPDATE_USER: (queryKey: number, data: any) =>
    axiosPost(`/api/user/${queryKey}`, data),

  UPDATE_NICKNAME: (id: string, data: any) =>
    axiosPost(`/api/user/nickname?id=${id}`, data),

  UPDATE_COMMENT: (id: number, data: any) =>
    axiosPost(`/api/look/comment?commentId=${id}`, data),

  UPDATE_TAG: (id: number, tags: string[]) =>
    axiosPost(`/api/user/tag?update=${id}`, tags),

  UPDATE_PROFILE: (data: any) => axiosPost("/api/user/image", data),

  GET_ALL_POST: (id: string, pageParam: string) =>
    axiosPost(`/api/look/post?cursor=${pageParam}`, { lookbookId: id }),
};

export { apiGet, apiPost };
