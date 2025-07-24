const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')



router.post('/register',[
    body('name').isLength({min:3}).withMessage('name must be more than 3 characters long'),
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password must be more than 6 characters long')
],userController.registerUser)






module.exports = router