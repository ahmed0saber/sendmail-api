const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sendmail0api@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    }
})

export default async (req, res) => {
    const {to, subject, message} = JSON.parse(req.body)

    await sendEmail(to, subject, message)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')

    res.status(200).json({
        success: true
    })
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