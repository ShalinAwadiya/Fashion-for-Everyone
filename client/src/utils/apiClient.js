// Author: Deep Adeshra (dp974154@dal.ca)

import axios from "axios";
import { AUTH_TOKEN_KEY, deleteLocalToken, getLocalToken } from "./firebase";

const AXIOS_CLIENT = axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: 'https://web-project-backend.herokuapp.com/'
});

AXIOS_CLIENT.interceptors.request.use(function (config) {
  const authKey = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authKey) {
    config.headers.Authorization = authKey;
  }

  return config;
});

AXIOS_CLIENT.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.response.status == 401 || err.response.status == 403) {
      if (getLocalToken()) {
        deleteLocalToken();
        if (window.location.pathname != "/login") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default AXIOS_CLIENT;
