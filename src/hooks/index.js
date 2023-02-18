import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { register, createSession } from "../api";
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
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const getuser = () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const { exp } = jwt(userToken);
        if (Date.now() < exp * 1000) {
          setUser(jwt(userToken));
          const timeout = setTimeout(() => {
            removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            setUser(null);
            toast.error("Session expired, please log in again");
          }, (exp - Date.now() / 1000) * 1000);
          setTimeoutId(timeout);
        } else {
          removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        }
      }
    };

    getuser();
    return () => clearTimeout(timeoutId);
  }, []);

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

      const { exp } = jwt(response.data.token);
      setUser(response.data.user);
      const timeout = setTimeout(() => {
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        setUser(null);
        toast.error("Session expired, please log in again");
      }, (exp - Date.now() / 1000) * 1000);
      setTimeoutId(timeout);
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
    clearTimeout(timeoutId);
    toast.success("Logged Out Successfully");
  };

  return {
    user,
    signup,
    login,
    logout,
  };
};


