import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios'
import Header from "../components/Header";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(UserDataContext);
  const [editingHabitId, seteditingHabitId] = useState(null);
  const [joinedHabits, setjoinedHabits] = useState([])
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const handleEdit =  (habit) => {
    seteditingHabitId(habit.habitId);
    setEditedTitle(habit.habitTitle)
    setEditedDescription(habit.habitDescription)

  };

  const fetchUserHabits = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.status === 200) {
        setjoinedHabits(res.data.joinedHabit);
      }
    } catch (err) {
      console.error("Failed to fetch updated habits:", err);
    }
  };

  const handleDelete = async (habit) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/habit/delete/${habit.habitId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Remove deleted habit from local state
      setjoinedHabits(prev =>
        prev.filter((h) => h.habitId !== habit.habitId)
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  
  const handleSave = async(habit)=>{

    const res  =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/habit/edit/${habit.habitId}`,{title : editedTitle , description : editedDescription},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    })
    console.log(res.data);
    setjoinedHabits((prev)=>{
        prev.map((h)=>(
            h.habitId === habit.habitId ? {...h , habitTitle : editedTitle , habitDescription:editedDescription}:h
            ))
    })

    seteditingHabitId(null)
  }

  useEffect(() => {
    fetchUserHabits()
    
  }, [])
  
  
  
  const handleCancel = ()=>{
seteditingHabitId(null)

  }


  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111] text-white">
        <h1 className="text-2xl font-semibold">Failed to Load...</h1>
      </div>
    );
  }

  const { username, email } = user.user;

  return (
    <div className="min-h-screen bg-[#0d0d0d]  text-white px-4 py-8">
      <div className="max-w-full mx-auto ">
        <Header username={username} email={email} />

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
          Your Habits
        </h2>

        {joinedHabits.length === 0 ? (
  <div>No Habits Found</div>
) : (
  <div>
    {joinedHabits.map((habit, index) => (
      <div
        key={index}
        className="bg-gray-800 p-6 rounded-xl mt-3 shadow-md hover:shadow-xl transition"
      >
        <h3 className="text-xl font-bold text-yellow-400">
          {habit.habitTitle}
        </h3>
        <p className="text-gray-300 mt-2">{habit.habitDescription}</p>

        <div className="mt-4 text-sm text-gray-400">
          <p>
            <strong>Last Completed:</strong>{" "}
            {habit.LastCompleted
              ? new Date(habit.LastCompleted).toDateString()
              : "Not yet completed"}
          </p>
          <p>
            <strong>Streak:</strong> {habit.streak}
          </p>
        </div>

        {user.user._id === habit.createdBy && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleEdit(habit)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
            >
              <FaEdit />
              Edit Habit
            </button>

            <button
              onClick={() => handleDelete(habit)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
            >
              <FaTrashAlt />
              Delete Habit
            </button>
          </div>
        )}

        {editingHabitId === habit.habitId && (
          <div className="bg-white text-black p-10 items-center mt-4">
            <div className="flex flex-col gap-2">
              <label>Title</label>
              <input
                type="text"
                className="bg-gray-400/50 px-4 py-3 rounded-xl"
                value={editedTitle}
                placeholder="Edit Title"
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <label>Description</label>
              <textarea
                rows={3}
                className="bg-gray-400/50 px-4 py-3 rounded-xl"
                value={editedDescription}
                placeholder="Edit Description"
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <button
                className="bg-green-500 text-white text-lg px-4 py-2 rounded-xl"
                onClick={() => handleSave(habit)}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white text-lg px-4 py-2 rounded-xl"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)}

      </div>
      <Footer />
    </div>
  );
};

export default Profile;