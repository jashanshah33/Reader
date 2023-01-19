import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { register, createSession, updateUser, profilePicture } from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils";
import jwt from "jwt-decode";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

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

  const signup = async (name, email, password) => {
    const response = await register(name, email, password);
    if (response.success) {
      return {
        success: true,
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
      return {
        success: true,
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
  };

  const update = async (body, userId) => {
    const response = await updateUser(body, userId);

    if (response.success) {
      return {
        data:response.data,
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const profilePic = async (profileId) => {
    const response = await profilePicture(profileId);

    if (response.success) {
      return {
        data:response.data,
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  return {
    user,
    signup,
    login,
    logout,
    update,
    profilePic
  };
};
