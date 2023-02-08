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
  const [userProfileImage, setUserProfileImage] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);


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
    const getProfilePic = async () => {
      if (user?.avatar) {
        const response = await profilePicture(user?.avatar);
        if (response.success) {
          setUserProfileImage(response.data.profilePicture.img.data);
        } else {
          toast.error("Error in fetching Profile Picture");
        }
      }
    };
    getProfilePic();

    const getBlog = async () => {
      const response = await blog();
      if (response.success) {
        setAllBlogs(response.data.blog)
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
    setUserProfileImage(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    toast.success("Logged Out Successfully");

  };

  return {
    user,
    userProfileImage,
    allBlogs,
    signup,
    login,
    logout,
  };
};
