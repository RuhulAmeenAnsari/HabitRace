const mongoose = require('mongoose')

const userStreakSchema = mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:'user'},
    streakCount :{type:Number,default:0},
    LastCompleted : {type:Date,default:Date.now}
})

const HabitSchema = mongoose.Schema({
    title :{
        type:String,
        required : true
    },
    description : {
        type : String,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'user'
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    participants : [userStreakSchema]

})

const HabitModel = mongoose.model('Habit',HabitSchema)
module.exports = HabitModel;