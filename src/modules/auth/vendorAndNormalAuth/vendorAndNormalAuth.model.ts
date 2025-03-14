import mongoose from 'mongoose'
import { IVendorAndNormalAuth } from './vendorAndNormalAuth.interface'

const vendorAndNormalAuthSchema = new mongoose.Schema<IVendorAndNormalAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetOtpToken: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ['VENDOR', 'NORMAL_USER'],
      default: 'NORMAL_USER',
    },
    userName: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const VendorAndNormalAuth = mongoose.model(
  'VendorAndNormalAuth',
  vendorAndNormalAuthSchema
)

export default VendorAndNormalAuth
