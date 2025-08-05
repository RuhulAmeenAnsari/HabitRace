import React from "react";

const LandingPage = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 flex flex-col items-center justify-center px-6 text-white font-sans">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-center">
        Make Habits with <span className="text-white/90">HabbitRace</span>
      </h1>

      <p className="max-w-xl text-lg md:text-xl text-center italic mb-12 drop-shadow-md">
        “Greatness isn’t born overnight — it’s built habit by habit, day by day. Start your journey now and race towards a better you.”
      </p>

      <div className="flex space-x-6">
        <button
          onClick={() => window.location.href = "/user-login"}
          className="bg-white text-red-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition"
        >
          Login
        </button>

        <button
          onClick={() => window.location.href = "/user-signup"}
          className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-red-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
