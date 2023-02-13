import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { register, createSession, profilePicture, blog } from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils";
import jwt from "jwt-decode";
import toast from "react-hot-toast";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  // const token = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

  // useEffect(() => {
  //   // console.log(token);
  //   if (token == null) {
  //     console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
  //     setUser(null);
  //     setUserProfileImage(null);
  //     removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  //     toast.success("Token has expired, please login again");
  //   }
  // }, [token]);

  useEffect(() => {
    const getuser = () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        setUser(user);
      }
    };

    getuser();
  }, []);

  useEffect(() => {

    const getBlog = async () => {
      const response = await blog();
      if (response.success) {
        setAllBlogs(response.data.blog);
        // console.log(response);
      }
    };

    getBlog();
  }, [user]);

  const signup = async (name, email, password) => {
    const response = await register(name, email, password);
    if (response.success) {
      return {
        success: true,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await createSession(email, password);

    if (response.success) {
      await setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      setUser(response.data.user);
      // console.log(response.data.user);
      return {
        success: true,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    toast.success("Logged Out Successfully");
  };

  return {
    user,
    allBlogs,
    signup,
    login,
    logout,
  };
};
