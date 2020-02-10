/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: App JS file for configuring express framework */

//Require Express, db connection, user router, and task router
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//Create app instance form express
const app = express()

//Configure app to parse JSON automatically
//Configure app routers
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//export app
module.exports = app