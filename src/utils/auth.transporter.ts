import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  debug: true,
})

export const sendOtpEmail = async (email: string): Promise<string> => {
  const otp = Math.floor(1000 + Math.random() * 9000)
  const token = jwt.sign({ otp, email }, process.env.JWT_SECRET as string, {
    expiresIn: '1m',
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}. It will expire in 60s.`,
  }
  await transporter.sendMail(mailOptions)
  return token
}
