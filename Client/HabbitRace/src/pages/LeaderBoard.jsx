import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const LeaderBoard = () => {
  const [participants, setParticipants] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/habit/leaderboard`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        });
     
        setParticipants(res.data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🏆 Leaderboard
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-gray-600 font-semibold">Rank</th>
                <th className="p-3 text-gray-600 font-semibold">Name</th>
                <th className="p-3 text-gray-600 font-semibold text-right">
                  Total Streak
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.length > 0 ? (
                participants.map((p, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        #{index + 1}
                      </td>
                      <td className="p-3 text-gray-700">{p.name}</td>
                      <td className="p-3 text-right font-bold text-gray-900">
                        {p.totalStreak}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No participants yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LeaderBoard;
