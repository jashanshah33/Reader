import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";
// import jwt from "jwt-decode";
// import toast from "react-hot-toast";
// import { useAuth } from "../hooks";

const custonFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  // if (token) {
  //   let decodedToken = jwt(token);
  //   const currentTime = Date.now().valueOf() / 1000;
  //   // const auth = useAuth();
  //   if (decodedToken.exp < currentTime) {
  //     window.localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
  //     toast.success("Token has expired, please login again");
  //   }
  // }
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
        message: data.message,
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

export const createSession = (email, password) => {
  return custonFetch(API_URLS.login(), {
    method: "post",
    body: { email, password },
  });
};
export const userProfile = (profileId) => {
  return custonFetch(`${API_URLS.userProfile()}?id=${profileId}`, {
    method: "get",
  });
};

export const profilePicture = (profileId) => {
  return custonFetch(`${API_URLS.profile()}?id=${profileId}`, {
    method: "get",
  });
};

export const toggleFollow = (userId, followToUserId) => {
  return custonFetch(`${API_URLS.toggleFollow()}`, {
    method: "post",
    body: { userId, followToUserId },
  });
};

export const followList = (userId) => {
  return custonFetch(`${API_URLS.followList()}?id=${userId}`, {
    method: "get",
  });
};

export const recentlyReaded = (userId) => {
  return custonFetch(`${API_URLS.recentlyReaded()}?id=${userId}`, {
    method: "get",
  });
};

export const allUser = (userId) => {
  return custonFetch(`${API_URLS.allUser()}?id=${userId}`, {
    method: "get",
  });
};

export const markNotificationAsReaded = (userId) => {
  return custonFetch(`${API_URLS.markNotificationAsReaded()}?id=${userId}`, {
    method: "post",
  });
};

export const deleteNotifications = (userId) => {
  return custonFetch(`${API_URLS.deleteNotifications()}?id=${userId}`, {
    method: "post",
  });
};

export const blog = () => {
  return custonFetch(`${API_URLS.blog()}`, {
    method: "get",
  });
};

export const singleblog = (blogId, userId) => {
  return custonFetch(`${API_URLS.singleblog()}`, {
    method: "post",
    body: { blogId, userId },
  });
};

export const deleteBlog = (blogId, userId) => {
  return custonFetch(`${API_URLS.deleteBlog()}`, {
    method: "post",
    body: { blogId, userId },
  });
};

export const searchBlog = (title) => {
  return custonFetch(`${API_URLS.searchBlog()}?title=${title}`, {
    method: "get",
  });
};

export const contact = (name, phone, email, message) => {
  return custonFetch(`${API_URLS.contact()}`, {
    method: "post",
    body: { name, email, phone, message },
  });
};
