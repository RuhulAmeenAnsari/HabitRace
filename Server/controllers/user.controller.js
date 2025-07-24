const userService = require('../services/user.service')
const userModel = require('../models/User.model')
const { validationResult } = require('express-validator')


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already registered with this email' })
    }
    const hashedPassword = await userModel.hashPassword(password)
    const user =await userService.createUser({
        name,
        email,
        password:hashedPassword
    })

    const token = await user.generateAuthToken()
     
    res.cookie('token', token)
    res.status(201).json({user,token})


}