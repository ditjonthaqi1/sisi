const express = require('express')
const userRouter = require('./routes/userRoute')
const {hash} = require('bcrypt')
const app =  express()
const path = require('path')

const publicdict = path.join(__dirname)

app.use(express.static(publicdict))
app.use(express.json())


require('./db')
const hbs = require('hbs')

app.set('view engine', hbs)

app.use(userRouter)


app.listen(8080,()=> console.log('U LSHU SERVERI'))