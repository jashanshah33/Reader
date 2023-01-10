import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { register } from "../api";

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const useProvideAuth = ()=>{
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

      return{
        signup
      }
}