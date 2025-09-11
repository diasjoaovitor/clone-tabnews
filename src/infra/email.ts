import 'setimmediate'

import nodemailer, { SendMailOptions } from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT),
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASSWORD
  },
  secure: process.env.NODE_ENV === 'production'
})

const send = async (mailOptions: SendMailOptions) => {
  await transporter.sendMail(mailOptions)
}

const email = {
  send
}

export default email
