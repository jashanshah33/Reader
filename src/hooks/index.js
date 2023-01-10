import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { register, createSession } from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from "../utils";
import jwt from "jwt-decode";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    const getuser = () => {
      const userToken =  getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

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
      console.log(response.data.token);
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

  return {
    user,
    signup,
    login,
  };
};