import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const { user, setuser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const data = response.data;
          setuser(data.user);
          setisLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/user-login");
      });
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Loading
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
