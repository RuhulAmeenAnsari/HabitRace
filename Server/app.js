const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes')
const cors = require('cors')
dotenv.config()

const connectToDB = require('./db/db')

const app = express()


app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/user',userRoutes)


app.get('/',(req,res)=>{
    res.send('hello world')
})

connectToDB()


module.exports = app