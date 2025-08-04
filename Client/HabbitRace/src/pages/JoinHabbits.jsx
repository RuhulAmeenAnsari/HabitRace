import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const JoinHabbits = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get('http://localhost:4000/habit/habits', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setHabits(res.data.habits)
      } catch (err) {
        console.error(err)
      }
    }

    fetchHabits()
  }, [])

  const handleJoin = async (habitId) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/habit/join/${habitId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert(res.data.message || 'Joined successfully!')
    } catch (err) {
      alert(err.response?.data?.message || 'Error joining habit')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">Join a Habit</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {habits?.map((habit, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-2">{habit.title}</h2>
            <p className="text-gray-300 mb-4">{habit.description}</p>
            <p className="text-sm text-gray-400 mb-2">
              Created At: <span className="text-white">{new Date(habit.createdAt).toDateString()}</span>
            </p>
            <button
              onClick={() => handleJoin(habit._id)}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Join Habit
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white font-medium rounded-full transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default JoinHabbits
