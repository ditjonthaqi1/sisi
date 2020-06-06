const express = require('express')
const userRouter = require('./routes/userRoute')
const {hash} = require('bcrypt')
const app =  express()
app.use(express.json())

require('./db')

app.use(userRouter)


app.listen(60201,()=> console.log('asdasdas'))