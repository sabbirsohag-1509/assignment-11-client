import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://scholarstream-ecru.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOutInfo } = useAuth();

  useEffect(() => {
    //interceptor for request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken} `;
      return config;
    });

    // Add a response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          //handle unauthorized or forbidden responses
          console.log("Unauthorized or Forbidden response - logging out user");
          logOutInfo();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutInfo]);

  return axiosSecure;
};

export default useAxiosSecure;
