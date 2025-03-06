import mongoose from 'mongoose'
import { IAuth } from './auth.interface'

const authSchema = new mongoose.Schema<IAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    resetOtpToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const Auth = mongoose.model('SUPER ADMIN AUTH', authSchema)

export default Auth
