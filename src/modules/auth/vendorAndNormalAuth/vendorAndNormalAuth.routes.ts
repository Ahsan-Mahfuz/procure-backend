import express from 'express'
import {
  changePassword,
  forgetPassword,
  getAllUsers,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
} from './vendorAndNormalAuth.controller'
import { bearerMiddleware } from '../../../middleware/middleware'

const vendorAndNormalAuthRouter = express.Router()

vendorAndNormalAuthRouter.post('/vendorOrNormalUser/register', register)
vendorAndNormalAuthRouter.post('/vendorOrNormalUser/login', login)
vendorAndNormalAuthRouter.post(
  '/vendorOrNormalUser/forget-password',
  forgetPassword
)
vendorAndNormalAuthRouter.post('/vendorOrNormalUser/verify-otp', verifyOtp)
vendorAndNormalAuthRouter.post(
  '/vendorOrNormalUser/reset-password',
  resetPassword
)
vendorAndNormalAuthRouter.post(
  '/vendorOrNormalUser/change-password',
  bearerMiddleware,
  changePassword
)
vendorAndNormalAuthRouter.post(
  '/vendorOrNormalUser/logout',
  bearerMiddleware,
  logout
)
vendorAndNormalAuthRouter.get('/get-all-user', getAllUsers)

export default vendorAndNormalAuthRouter
