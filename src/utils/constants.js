const API_ROOT = "http://35.183.238.115/api/v1";

export const API_URLS = {
  signup: () => `${API_ROOT}/user/signup`,
  login: () => `${API_ROOT}/user/login`,
  userProfile: () => `${API_ROOT}/user/profile`,
  profile: () => `${API_ROOT}/user/profilePicture`,
  toggleFollow: () => `${API_ROOT}/user/toggleFollow`,
  followList: () => `${API_ROOT}/user/followList`,
  recentlyReaded: () => `${API_ROOT}/user/recentlyReadedList`,
  allUser: () => `${API_ROOT}/user/allUser`,
  markNotificationAsReaded: () => `${API_ROOT}/user/markNotificationASReaded`,
  deleteNotifications: () => `${API_ROOT}/user/deleteNotifications`,
  forgetPassword: () => `${API_ROOT}/user/forgetPassword`,
  updatePassword: () => `${API_ROOT}/user/updatePassword`,
  blog: () => `${API_ROOT}/blog/allBlogs`,
  singleblog: () => `${API_ROOT}/blog/singleBlogs`,
  deleteBlog: () => `${API_ROOT}/blog/deleteBlog`,
  searchBlog: () => `${API_ROOT}/search/searchBlogUser`,

  contact: () => `${API_ROOT}/contact/message`,
};

export const LOCALSTORAGE_TOKEN_KEY = "__blog_token__";
