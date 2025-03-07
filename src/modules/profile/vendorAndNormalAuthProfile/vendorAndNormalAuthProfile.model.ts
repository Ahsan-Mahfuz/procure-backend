import mongoose from 'mongoose'
import { IVendorAndNormalAuthProfile } from './vendorAndNormalAuthProfile.interface'

const vendorAndNormalAuthProfileSchema =
  new mongoose.Schema<IVendorAndNormalAuthProfile>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'VENDOR AND NORMAL AUTH',
      },
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
      area: {
        type: String,
      },
      building: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      streetAddress: {
        type: String,
      },
      document: {
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

export const VendorAndNormalAuthProfile = mongoose.model(
  'VENDOR OR NORMAL AUTH PROFILE',
  vendorAndNormalAuthProfileSchema
)

export default VendorAndNormalAuthProfile
