import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaUsers, FaUserCircle, FaHome, FaTrophy } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1c1c1c] text-white py-2 px-3 sm:py-3 sm:px-5 border-t border-gray-700 shadow-inner z-50">
      <div className="flex justify-between sm:justify-around items-center max-w-md mx-auto w-full gap-3 sm:gap-6">
        
        <Link
          to="/home"
          className="flex flex-col items-center text-xs sm:text-sm hover:text-indigo-400 transition"
        >
          <FaHome size={22} />
          <span>Home</span>
        </Link>

        <Link
          to="/habit/create"
          className="flex flex-col items-center text-xs sm:text-sm hover:text-green-400 transition"
        >
          <FaPlusCircle size={22} />
          <span>Create</span>
        </Link>

        <Link
          to="/habit/join"
          className="flex flex-col items-center text-xs sm:text-sm hover:text-blue-400 transition"
        >
          <FaUsers size={22} />
          <span>Join</span>
        </Link>

        <Link
          to="/leaderboard"
          className="flex flex-col items-center text-xs sm:text-sm hover:text-orange-400 transition"
        >
          <FaTrophy size={22} />
          <span>Leader</span>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center text-xs sm:text-sm hover:text-yellow-400 transition"
        >
          <FaUserCircle size={22} />
          <span>Profile</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
