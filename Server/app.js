const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const connectToDB = require('./db/db')

const app = express()


app.get('/',(req,res)=>{
    res.send('hello world')
})

connectToDB()


module.exports = app