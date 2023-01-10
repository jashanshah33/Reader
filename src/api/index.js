import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const custonFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.log("error", error);

    return {
      message: error.message,
      success: false,
    };
  }
};

export const register = (name, email, password) => {
  return custonFetch(API_URLS.signup(), {
    method: "post",
    body: { name, email, password },
  });
};
