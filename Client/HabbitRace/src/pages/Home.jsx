import React from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      {/* Top Navbar */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#8e2de2] via-[#4a00e0] to-[#8e2de2] shadow-md">
        <h1 className="text-xl font-bold">HabitRace 🏁</h1>
        <Link to="/create-race">
          <IoIosAddCircleOutline className="text-3xl text-white hover:text-yellow-300 transition" />
        </Link>
      </header>

      {/* Stories */}
      <section className="flex gap-4 px-4 mt-4 overflow-x-auto pb-3 border-b border-gray-700">
        {["🏃", "💪", "📚", "🧘", "🎯"].map((icon, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center text-2xl shadow-md">
              {icon}
            </div>
            <p className="text-sm text-gray-400 mt-1">Race {idx + 1}</p>
          </div>
        ))}
      </section>

      {/* Feed Section */}
      <main className="px-4 py-6 space-y-6 max-w-xl mx-auto">
        {/* Media Post */}
        <div className="bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500"></div>
            <div>
              <h3 className="font-semibold">Run With Me</h3>
              <p className="text-xs text-gray-400">5AM Jog | 21 joined</p>
            </div>
          </div>
          <img
            src="https://source.unsplash.com/600x400/?running"
            alt="habit"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <p className="text-gray-300 mb-3">
              Join our daily 5AM run challenge and build your habit streak! 💪
            </p>
            <button className="w-full py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold hover:scale-105 transition">
              Join Race
            </button>
          </div>
        </div>

        {/* Community Post */}
        <div className="bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-lime-500"></div>
            <div>
              <h3 className="font-semibold">Read&Reflect</h3>
              <p className="text-xs text-gray-400">📖 Daily Reading</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            "Consistency beats intensity. Make time every day to become 1% better."
          </p>
          <button className="w-full py-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg font-semibold hover:scale-105 transition">
            Comment
          </button>
        </div>

        {/* Video Post */}
        <div className="bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-400 to-orange-500"></div>
            <div>
              <h3 className="font-semibold">Stretch & Meditate</h3>
              <p className="text-xs text-gray-400">🧘 30-day streak</p>
            </div>
          </div>
          <video controls className="w-full h-60 object-cover">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="p-4">
            <p className="text-gray-300 mb-2">Feel the calm. Reset your mind daily.</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg font-semibold hover:scale-105 transition">
              Join Meditation
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-[#1f1f1f] border-t border-gray-700 flex justify-around py-3 text-gray-400">
        <Link to="/home" className="hover:text-white"><MdHome className="text-2xl" /></Link>
        <Link to="/explore" className="hover:text-white"><IoSearch className="text-2xl" /></Link>
        <Link to="/create-race" className="hover:text-white"><IoIosAddCircleOutline className="text-3xl" /></Link>
        <Link to="/profile" className="hover:text-white"><FaUserAlt className="text-xl" /></Link>
      </nav>
    </div>
  );
};

export default Home;
