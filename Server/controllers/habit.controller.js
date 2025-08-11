
const habitService = require('../services/habit.service')
const HabitModel = require('../models/habbit.model');
const UserModel = require('../models/User.model');

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

        habit.participants.push({userId:req.userId})
        await habit.save()
        
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

module.exports.habitComplete = async (req,res)=>{

    const userId = req.userId
    const habitId = req.params.habitId 

    try{

        const habit = await HabitModel.findById(habitId)
        if(!habit){
            return res.status(404).json({message:"Habit not Found"})
        }

        const participant = habit.participants.find(p=>p.userId.toString() === userId)
        if(!participant) {
            return res.status(403).json({message:'You are not a Participant'})
        }

        const today = new Date().toDateString()
        const lastcompleted = new Date(participant.LastCompleted).toDateString()

        if(today === lastcompleted && participant.streak > 0){
            return res.status(400).json({message : 'Already marked completed for today'})
        }

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate()-1)

        const isYesterday = new Date(participant.LastCompleted).toDateString() === yesterday.toDateString()

        participant.streakCount = isYesterday ? participant.streakCount + 1 : 1
        participant.LastCompleted = new Date()

        await habit.save()
        res.json({message : 'Habit mark as Completed' , streak : participant.streakCount})



    }catch(err){
        return res.status(500).json({message : err.message})
    }



}


module.exports.leaderboard = async(req,res)=>{

    const habits = await HabitModel.find()
    const userScores = {}

    habits.forEach(habit => {
        habit.participants.forEach((p)=>{
            const userId = p.userId.toString()
            if(!userScores[userId]) userScores[userId] = 0
            userScores[userId] += p.streakCount
        })
    });

    const user = await UserModel.find({_id:{$in : Object.keys(userScores)}})

    console.log(user);

    const leaderboard = user.map((user)=>({
        name : user.username,
        totalStreak : userScores[user._id.toString()]
    })).sort((a,b)=>b.totalStreak-a.totalStreak)

res.json(leaderboard)
}