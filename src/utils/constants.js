const API_ROOT = "http://localhost:8000/api/v1";

export const API_URLS = {
  signup: () => `${API_ROOT}/user/signup`,
  login: () => `${API_ROOT}/user/login`,
  profile: () => `${API_ROOT}/user/profilePicture`,
  blog: () => `${API_ROOT}/blog/allBlogs`,
  singleblog: () => `${API_ROOT}/blog/singleBlogs`,


};

export const LOCALSTORAGE_TOKEN_KEY = "__blog_token__";
