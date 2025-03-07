import mongoose from 'mongoose'
import { ISuperAdminProfile } from './superAdminProfile.interface'

const superAdminProfileSchema = new mongoose.Schema<ISuperAdminProfile>(
  {
    superUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'SUPER ADMIN AUTH',
    },
    userName: {
      type: String,
    },
    contact: {
      type: Number,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const SuperAdminProfile = mongoose.model(
  'SUPER ADMIN PROFILE',
  superAdminProfileSchema
)

export default SuperAdminProfile
