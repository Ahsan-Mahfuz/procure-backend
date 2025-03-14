import mongoose from 'mongoose'
import { IPrivacyPolicy } from './privacyPolicy.interface'

const privacyPolicySchema = new mongoose.Schema<IPrivacyPolicy>(
  {
    privacyPolicy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const PrivacyPolicy = mongoose.model(
  'PrivacyPolicy',
  privacyPolicySchema
)
export default PrivacyPolicy
