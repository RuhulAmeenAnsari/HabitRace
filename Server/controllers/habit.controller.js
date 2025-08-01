
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
        const isAlreadyJoined = habit.participants?.some(p => p.userId?.toString() === req.userId);
        
        if(!isAlreadyJoined){
            habit.participants.push({userId:req.userId})
            await habit.save()
        }
        
        res.status(201).json(habit)



    }catch(error){
        console.log(error);
    }
}

module.exports.editHabit = async (req,res)=>{

    const {title , description} = req.body
    const habitId = req.params.id 
    try{
        const habit = await HabitModel.findById(habitId)
        if(!habit){
            return res.status(404).json({message :'Habit not Found'})
        }
        if(habit.createdBy.toString() !== req.userId){
            return res.status(403).json({message:'NOT AUTHORIZED'})
        }

        habit.title = title
        habit.description = description

        await habit.save()
        res.json(habit)



    }catch(error){
        res.status(500).json({error : error.message})
    }

}

module.exports.deleteHabit = async (req,res)=>{

    const habitId = req.params.id 

    try{

        const habit = await HabitModel.findById(habitId)
        if(!habit){
            return res.status(404).json({message:'Habit not Found'})
        }
        if(habit.createdBy?.toString() !== req.userId?.toString()){
            return res.status(403).json({message:'NOT AUTHORIZED'})
        }

        await habit.deleteOne();
        
        res.json({message:'habit deleted'})

    }
    catch(err){
        res.status(500).json({err : err.message})
    }
}