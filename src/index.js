/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Index js file for running the application */

//Require app file
const app = require('./app')

//Setup port from either Heroku | Local Environment
const port = process.env.PORT

//Start the server on the specified port
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})