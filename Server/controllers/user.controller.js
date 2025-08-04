const userService = require('../services/user.service')
const userModel = require('../models/User.model')
const { validationResult } = require('express-validator')
const HabitModel = require('../models/habbit.model')


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })
    if (isUserAlreadyExists) {
        return res.status(401).json({ message: 'User already registered with this email' })
    }
    const hashedPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
        username,
        email,
        password: hashedPassword
    })

    const token = await user.generateAuthToken()

    res.cookie('token', token)
    res.status(201).json({ user, token })


}

module.exports.logInUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password')
    if (!user) {
        return res.status(401).json({ message: 'something went wrong' })
    }

    const isMatched = await user.comparePassword(password)
    if (!isMatched) {
        return res.status(401).json({ message: 'something went wrong' })
    }

    const token = await user.generateAuthToken()
    res.cookie('token', token)
    res.status(200).json({ user, token })
}

module.exports.userProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user })
}

module.exports.profile = async (req,res)=>{

    try {
        
        const user = await userModel.findById(req.userId).select('-password')
        const habits = await HabitModel.find({'participants.userId' : req.userId})

        const joinedHabit = habits.map(habit =>{
            const p =  habit.participants.find(p=>p.userId.toString()===req.userId)
            return{
                habitId : habit._id,
                habitTitle : habit.title,
                habitDescription : habit.description,
                streak : p?.streakCount,
                LastCompleted : p?.LastCompleted
            }
        })
     

        res.status(200).json({user , joinedHabit})
    

    } catch (error) {
        res.status(500).json({message:'Failed to Load Profile'})
    }

}