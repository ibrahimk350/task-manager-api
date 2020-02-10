/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Initializes connection to mongo db using mongoose */

//Require mongoose
const mongoose = require('mongoose')

//Connect to MongoDb
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})