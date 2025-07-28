
const habitService = require('../services/habit.service')
const HabitModel = require('../models/habbit.model')

module.exports.createHabitController = async (req, res) => {

    try {
        const userId = req.user._id
        const { title, description } = req.body;

        if(!req.user || !req.user._id){
            return res.status(401).json({message : 'unauthorized , please Login First'})
        }

        if(!title || !description){
            return res.status(400).json({message:"title and description are required"})
        }

        

        const habit = await habitService.createHabit({
            title,
            description,
            userId
        })

        return res.status(201).json({
            message: 'habbit created successfully',
            habit
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }




}

module.exports.getHabitsController = async ( req , res ) => {
        
    try{
        const habits = await HabitModel.find().populate('createdBy','title')
    return res.status(201).json({habits})
    
    }
    catch(error){
        return res.status(500).json({message : ' failed to fetch habits..'})
    }

}

module.exports.joinHabit = async (req,res)=>{
    const habitId = req.params.id 
    try{
        const habit =await HabitModel.findById(habitId)
        isAlreadyJoined =  habit.participants.some(p=>p.userId.toString()===req.userId)
        if(!isAlreadyJoined){
            habit.participants.push({userId:req.userId})
            await habit.save()
        }
        res.status(201).json(habit)



    }catch(error){
        console.log(error);
    }
}