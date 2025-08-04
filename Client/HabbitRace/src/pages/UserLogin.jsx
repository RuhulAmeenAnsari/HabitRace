import React, { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { user, setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const userData = {
    email: email,
    password: password,
  };



  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/user/login`,
        userData
      );
      console.log(response);
      if (response.status == 200) {
        const data = response.data;
        setuser(data.user);
        localStorage.setItem("token",data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status == 401) {
        alert("invalid email or password");
        navigate("/user-login");
      } else {
        console.log("something went wrong");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <form className="bg-[#1a1a2e] shadow-xl rounded-2xl p-8 w-full max-w-md border border-purple-600/40">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
          Welcome Back
        </h2>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-fuchsia-200">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fuchsia-200">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
        <button
          onClick={handlesubmit}
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 hover:scale-105 hover:shadow-lg text-black font-bold py-3 rounded-lg transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/user-signUp" className="text-fuchsia-400 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
