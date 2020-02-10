/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Middleware authentation for HTTP requests using jsonwebtoken library */

//Require JWT/User model
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//Create auth middleware function
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

//export auth
module.exports = auth