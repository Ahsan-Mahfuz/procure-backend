import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Auth from './auth.model'
import { sendOtpEmail } from '../../../utils/auth.transporter'
import { AuthenticatedRequest } from '../../../middleware/middleware.interface'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }
    if (await Auth.findOne({ email })) {
      res.status(400).json({ message: 'User already exists' })
      return
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await Auth.create({ email, password: hashedPassword })

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }
    const user = await Auth.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '20d' }
    )
    res.status(200).json({ message: 'User logged in successfully', token })
  } catch (error) {
    res.status(500).json({ message: 'Error login user', error })
  }
}

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    if (!email) {
      res.status(400).json({ message: 'Email is required' })
      return
    }

    const user = await Auth.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const otpToken = await sendOtpEmail(email)

    user.resetOtpToken = otpToken
    await user.save()

    res.status(200).json({ message: 'OTP sent successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error })
  }
}

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body
    if (!email || !otp) {
      res.status(400).json({ message: 'Email and OTP are required' })
      return
    }
    const user = await Auth.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const decoded = jwt.verify(
      user.resetOtpToken as string,
      process.env.JWT_SECRET as string
    ) as { otp: string }
    const decodedOtp = decoded.otp
    if (String(decodedOtp) !== String(otp)) {
      res.status(400).json({ message: 'Invalid OTP' })
      return
    }
    res.status(200).json({ message: 'OTP verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword, confirmPassword } = req.body
    if (!email || !newPassword || confirmPassword !== newPassword) {
      res.status(400).json({ message: 'Email and Password are required' })
      return
    }
    const user = await Auth.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    if (user.resetOtpToken === undefined) {
      res.status(400).json({ message: 'Please, verify your OTP' })
      return
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.resetOtpToken = undefined
    await user.save()
    res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error })
  }
}

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || confirmPassword !== newPassword) {
      res.status(400).json({
        message:
          'Current password, new password, and confirm password are required',
      })
      return
    }
    const user = await Auth.findOne({ email: req.user?.email })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const prevPassword = await bcrypt.compare(currentPassword, user.password)
    if (!prevPassword) {
      res.status(401).json({ message: 'Invalid current password' })
      return
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    await user.save()
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'User logged out successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error logging out user', error })
  }
}
