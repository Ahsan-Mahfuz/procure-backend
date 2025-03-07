import mongoose from 'mongoose'

export interface IVendorAndNormalAuthProfile {
  user: mongoose.Types.ObjectId
  fullName?: string
  phoneNumber?: number
  area?: string
  building?: string
  postalCode?: string
  streetAddress?: string
  image?: string
  document?: string
}
