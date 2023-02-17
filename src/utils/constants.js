const API_ROOT = "http://localhost:8000/api/v1";

export const API_URLS = {
  signup: () => `${API_ROOT}/user/signup`,
  login: () => `${API_ROOT}/user/login`,
  userProfile: () => `${API_ROOT}/user/profile`,
  profile: () => `${API_ROOT}/user/profilePicture`,
  toggleFollow: () => `${API_ROOT}/user/toggleFollow`,
  followList: () => `${API_ROOT}/user/followList`,
  blog: () => `${API_ROOT}/blog/allBlogs`,
  singleblog: () => `${API_ROOT}/blog/singleBlogs`,
  deleteBlog: () => `${API_ROOT}/blog/deleteBlog`,
  searchBlog: () => `${API_ROOT}/search/searchBlogUser`,
  contact: () => `${API_ROOT}/contact/message`,
};

export const LOCALSTORAGE_TOKEN_KEY = "__blog_token__";
