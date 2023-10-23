"use client"

import { ECOMMERCE_TOKEN, ENDPOINT } from "@/constants";
import { message } from "antd";
import { getCookie } from "cookies-next";
import axios from "axios";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${getCookie(ECOMMERCE_TOKEN)}`,
  },
});

request.interceptors.response.use(
  (response) => {
    if (response.data && response.data.accesstoken) {
      message.success(
        `success | Hush kelibsiz ${response.data.user.firstName}`
      );
    }
    return response;
  },
  (err) => {
    if (err.response && err.response.data) {
      message.error(err.response.data.msg);
    }
    return Promise.reject(err);
  }
);


export default request;
