import React from 'react'
import { Link } from 'react-router';

const Header = ({username,email}) => {

  return (
    <div className="bg-[#1c1c1c] py-4 flex items-center justify-between px-10 mb-6 shadow-md">
    <div>
      <h1 className="text-2xl font-bold">{username}</h1>
      <p className="text-sm text-gray-400">{email}</p>
    </div>
    <Link
      to={"/user-login"}
      className="bg-gradient-to-l to-red-900 from-red-600 p-2 shadow shadow-amber-700 hover:bg-gradient-to-b hover:from-red-900 hover:to-red-600 rounded-xl font-semibold text-xl"
      onClick={() => localStorage.removeItem("token")}
    >
      Log Out
    </Link>
  </div>
  )
}

export default Header