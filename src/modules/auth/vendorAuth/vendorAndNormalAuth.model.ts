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
  },
  {
    timestamps: true,
  }
)

export const VendorAndNormalAuth = mongoose.model(
  'VENDOR AND NORMAL AUTH',
  vendorAndNormalAuthSchema
)

export default VendorAndNormalAuth
