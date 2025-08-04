import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaUsers, FaTrashAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1c1c1c] text-white py-3 px-5 flex justify-around border-t border-gray-700 shadow-inner z-50">
      
      <Link
        to="/habit/create"
        className="flex flex-col items-center text-sm hover:text-green-400 transition"
      >
        <FaPlusCircle size={20} />
        <span>Create Habit</span>
      </Link>

      <Link
        to="/habit/join"
        className="flex flex-col items-center text-sm hover:text-blue-400 transition"
      >
        <FaUsers size={20} />
        <span>Join Habit</span>
      </Link>

     
    </footer>
  );
};

export default Footer;
