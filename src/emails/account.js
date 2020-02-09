const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'stikerdestiny@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the Task Manager App, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'stikerdestiny@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Thanks for being a part of the Task Manager App ${name}. Is there anything we could have done to have kept you on board? I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}