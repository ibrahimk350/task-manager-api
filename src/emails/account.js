/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Email configuration for sending emails using Sendgrid Library */

//Require sendgrid mail
const sgMail = require('@sendgrid/mail')

//Set the API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//Create Welcome Email
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'stikerdestiny@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the Task Manager App, ${name}. Let me know how you get along with the app.`
    })
}

//Create Cancellation Email
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'stikerdestiny@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Thanks for being a part of the Task Manager App ${name}. Is there anything we could have done to have kept you on board? I hope to see you back sometime soon.`
    })
}

//Export Emails
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}