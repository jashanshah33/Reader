const API_ROOT = "http://localhost:8000/api/v1";

export const API_URLS = {
  signup: () => `${API_ROOT}/user/signup`,
  login: () => `${API_ROOT}/user/login`,
};

export const LOCALSTORAGE_TOKEN_KEY = "__blog_token__";
