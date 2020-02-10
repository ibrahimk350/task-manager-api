/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Task Model */

//Require mongoose
const mongoose = require('mongoose')

//Create Mongoose Task Schema
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

//Pass mongoose task schema to mongoose model
const Task = mongoose.model('Task', taskSchema)

//export Task model
module.exports = Task