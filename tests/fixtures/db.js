/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Test Data for Test Cases */

//Require jwt, mongoose, User Model, Task Model
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

//Create User One Object
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike Test',
    email: 'miketest@example.com',
    password: 'Yosemite565!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

//Create User Two Object
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'John Test',
    email: 'johntest@example.com',
    password: 'Yosemite565!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

//Create Task One for User One
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Test Task',
    completed: false,
    owner: userOne._id
}

//Create Task Two for User One
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Test Task',
    completed: true,
    owner: userOne._id
}

//Create Task Three for User Two
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Test Task',
    completed: true,
    owner: userTwo._id
}

//Setup Database
//Deletes Users, Deletes Task, Creates Users, Creates Task before every test suite environment
const setupDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

//Export users and tasks along with setupdatabase
module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}