import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);

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
    }
  }

  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ token ,setToken,userData,setUserData}}>{children}</AuthContext.Provider>
  );
}
