import axios from "axios";

import { logout, setToken } from "../redux/slices/auth/authReducer";
export const instance = axios.create({
  baseURL: "https://sanwebsiteapi.onrender.com",

  // baseURL: "http://localhost:4000",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Getting store

let store;
export const injectStore = (_store) => {
  store = _store;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //get token from redux store
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const originalConfig = error?.config;
    if (error?.response) {
      if (error?.response?.status === 403 && !originalConfig._retry) {
        // 403 come from verify Access token
        originalConfig._retry = true;
        try {
          if (error?.response?.status !== 401) {
            //we use if -to prevent infinite call to refresh Api if it sends invalid refresh token error then user must logout
            //401 come from refresh Api
            const response = await instance.post("/auth/refreshtoken");
            const { token } = await response.data;
            store.dispatch(setToken({ token: token }));
            return instance(originalConfig);
          }
        } catch (error) {
          store.dispatch(logout());

          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  }
);

//   axios.interceptors.request.eject(myInterceptor);
