const HabitModel = require('../models/habbit.model')

module.exports.createHabit = async ({title , description , userId })=>{

if(!title || !description){
    throw new Error('all fields are required')
}

const habit = HabitModel.create({
    title ,
    description,
    createdBy : userId,
    participant : [{
        userId,
        streakCount : 0,
        LastCompleted : new Date()
    }]

})

return habit

}