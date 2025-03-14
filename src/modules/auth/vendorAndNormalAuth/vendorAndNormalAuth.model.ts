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

    phoneNumber: {
      type: String,
      required: true,
    },
    serviceCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: function (this: IVendorAndNormalAuth) {
          return this.role === 'VENDOR'
        },
      },
    ],
    experience: {
      type: String,
      required: (this as any).role === 'VENDOR',
      enum: ['<1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
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
