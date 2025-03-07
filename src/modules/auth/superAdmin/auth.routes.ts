import express from 'express'
import {
  changePassword,
  forgetPassword,
  login,
  register,
  resetPassword,
  verifyOtp,
} from './auth.controller'
import { bearerMiddleware } from '../../../middleware/middleware'

const authRouter = express.Router()

authRouter.post('/super-admin/register', register)
authRouter.post('/super-admin/login', login)
authRouter.post('/super-admin/forget-password', forgetPassword)
authRouter.post('/super-admin/verify-otp', verifyOtp)
authRouter.post('/super-admin/reset-password', resetPassword)
authRouter.post(
  '/super-admin/change-password',
  bearerMiddleware,
  changePassword
)

export default authRouter
