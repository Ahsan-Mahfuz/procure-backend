import mongoose from 'mongoose'

export interface ISuperAdminProfile {
  id: mongoose.Types.ObjectId
  userName?: string
  contact?: number
  address?: string
  image?: string
}
