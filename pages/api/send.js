const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sendmail0api@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    }
})

export default async (req, res) => {
    const { to, subject, message } = JSON.parse(req.body)
    const validationErrors = getValidationErrors(to, subject, message)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')

    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({ success: false, errors: validationErrors })
    }

    await sendEmail(to, subject, message)

    return res.status(200).json({
        success: true
    })
}

const getValidationErrors = (to, subject, message) => {
    const errors = {}
    if (!/^\S+@\S+\.\S+$/.test(to)) {
        errors.to = "Email address is not valid"
    }
    if (!/\S+/.test(subject)) {
        errors.subject = "Subject cannot be empty"
    }
    if (!/\S+/.test(message)) {
        errors.message = "Message cannot be empty"
    }

    return errors
}

const sendEmail = async (receiver, subject, message) => {
    const mailOptions = {
        from: "sendmail0api@gmail.com",
        to: receiver,
        subject: subject,
        html: message
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve("Email sent: " + info.response);
            }
        });
    });
}