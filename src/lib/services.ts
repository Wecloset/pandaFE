import axios from "axios";
import { NextRouter } from "next/router";

export const axiosPost = async (
  url: string,
  data: object,
  router?: NextRouter,
  location?: any,
) => {
  await axios
    .post(url, {
      headers: { "Content-Type": "application/json" },
      data,
    })
    .then(res => {
      res.status === 200 && window.alert(res.data.message);
      router?.replace(location);
    })
    .catch(error => {
      window.alert(`${error.response.data.message}`);
    });
};

export const axiosGet = async (url: string) => await axios.get(url);

export const axiosDelete = async (url: string) => await axios.delete(url);
