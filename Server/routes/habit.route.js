const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.Middleware')
const habitController = require('../controllers/habit.controller')
 
router.post('/create',authMiddleware.authUserMiddleware,habitController.createHabitController)
router.get('/habits',authMiddleware.authUserMiddleware,habitController.getHabitsController)
router.post('/join/:id',authMiddleware.authUserMiddleware,habitController.joinHabit)





module.exports = router