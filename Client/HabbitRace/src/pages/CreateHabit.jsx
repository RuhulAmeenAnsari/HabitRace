import axios from "axios";
import {useNavigate} from 'react-router-dom'
import React, { useState } from "react";

const CreateHabit = () => {


   
    const [title, setTitle] = useState("")
    const [description, setdescription] = useState("")
    const habitData = {
        title:title,
        description:description
    }
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    
    const  submitHandler=async(e)=>{

        e.preventDefault()

        try {

            const response = await axios.post('http://localhost:4000/habit/createHabit',habitData,{
              headers:{
                Authorization:`bearer ${token}`
              }
            })
            console.log(response.data);
            setTitle("")
            setdescription("")
            navigate('/home')
            
        } catch (error) {
            console.log(error);
        }

    }






  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-10">
      <div className="bg-[#1c1c1c] p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Create a New Habit
        </h2>

        <form onSubmit={(e)=>submitHandler(e)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Habit Title</label>
            <input

              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              type="text"
              placeholder="Enter habit title"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Habit Description</label>
            <input
              value={description}
              onChange={(e)=>setdescription(e.target.value)}
              type="text"
              placeholder="Enter habit description"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabit;
