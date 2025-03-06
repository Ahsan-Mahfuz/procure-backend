import mongoose from 'mongoose'
import { ITermsAndConditions } from './termsAndConditions.interface'

const termsAndConditionsSchema = new mongoose.Schema<ITermsAndConditions>(
  {
    termsAndConditions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const TermsAndConditions = mongoose.model(
  'TermsAndConditions',
  termsAndConditionsSchema
)
export default TermsAndConditions
