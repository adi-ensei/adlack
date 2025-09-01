import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication failed. Please refresh the page");
          }
          console.log("Error getting token");
        }
        return config;
      },
      (error) => {
        console.error("Axios request error", error);
        return Promise.reject(error);
      }
    );
    //   cleanup function to remover the interceptor this is important to remove memory leaks
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
