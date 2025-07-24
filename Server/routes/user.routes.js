const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.Middleware')



router.post('/register',[
    body('name').isLength({min:3}).withMessage('name must be more than 3 characters long'),
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password must be more than 6 characters long')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],userController.logInUser)




module.exports = router