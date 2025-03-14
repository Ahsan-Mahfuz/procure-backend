import mongoose from 'mongoose'
import { IBusinessProfile } from './businessProfile.interface'

const businessProfileSchema = new mongoose.Schema<IBusinessProfile>(
  {
    userName: {
      type: String,
      required: true,
    },
    businessPhoneNumber: {
      type: String,
      required: true,
    },
    yearBusinessStarted: {
      type: String,
      required: true,
    },
    noOfEmployees: {
      type: String,
      required: true,
    },
    vatNumber: {
      type: String,
      required: true,
    },
    registrationOrIDNumber: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    selectServices: {
      type: String,
      required: true,
    },
    serviceCategories: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logoImage: {
      type: String,
    },
    serviceImage: {
      type: String,
    },
    area: {
      type: String,
    },
    building: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    serviceRadius: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const BusinessProfile = mongoose.model(
  'BusinessProfile',
  businessProfileSchema
)
export default BusinessProfile
