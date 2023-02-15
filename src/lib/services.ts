import axios from "axios";

export const axiosPost = async (url: string, data: object) =>
  await axios.post(url, {
    headers: { "Content-Type": "application/json" },
    data,
  });

export const axiosGet = async (url: string) => await axios.get(url);

export const axiosDelete = async (url: string) => await axios.delete(url);
