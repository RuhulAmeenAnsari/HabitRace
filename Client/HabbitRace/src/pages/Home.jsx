import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFire, FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  const handleMarkasComplete = async (habitId, LastCompleted,streak) => {

    const today = new Date().toDateString();
    const last = LastCompleted ? new Date(LastCompleted).toDateString() : null;
    if (today === last && streak > 0) {
      return alert("you have already marked this Habbit as completed ");
    }


    await axios.patch(
      `http://localhost:4000/habit/complete/${habitId}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProfile(response.data);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111] text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans ">
      {/* Profile Header */}

      <Header username={profile.user.username} email={profile.user.email}/>

      {/* Habit Feed */}
      <div className=" px-6 py-4">
        <h2 className="text-xl font-semibold mb-4">Your Habit Feed</h2>

        {profile.joinedHabit.length === 0 ? (
          <p className="text-gray-500">You haven’t joined any habits yet.</p>
        ) : (
          <div className="space-y-4">
            {profile.joinedHabit.map((habit, index) => (
              <div
                key={index}
                className="bg-[#1b1b1b] p-5 rounded-xl border border-gray-800 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-yellow-400 mb-1">
                  {habit.habitTitle}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  {habit.habitDescription}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <FaRegCheckCircle className="mr-1 text-green-400" />
                      Last:{" "}
                      {habit.LastCompleted
                        ? new Date(habit.LastCompleted).toDateString()
                        : "Never"}
                    </span>
                    <span className="flex items-center">
                      <FaFire className="mr-1 text-red-500" />
                      Streak: {habit.streak}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleMarkasComplete(habit.habitId, habit.LastCompleted,habit.streak)
                    }
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-white text-xs"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
