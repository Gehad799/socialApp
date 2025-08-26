import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);
    const [authError, setAuthError] = useState(false);

    async function getUserData(userToken) {
    try {
      const { data: response } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: { token: userToken },
        }
      );
      console.log("date fetched", response);
      if (response?.message === "success") {
        toast.success("Data fetched successfully!");
        setUserData(response.user);
      } else {
        throw new Error("Failed to fetch data", response?.error);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error;
      toast.error(errorMsg);
       setToken(null);
      localStorage.removeItem("token");
      setAuthError(true); 
    }
  }

  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token]);
    if (authError) {
    return <Navigate to="/login"  />;
  }
  return (
    <AuthContext.Provider value={{ token ,setToken,userData,setUserData}}>{children}</AuthContext.Provider>
  );
}
