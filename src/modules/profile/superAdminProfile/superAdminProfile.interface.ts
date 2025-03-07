import mongoose from 'mongoose'

export interface ISuperAdminProfile {
  superUser: mongoose.Types.ObjectId
  userName?: string
  contact?: number
  address?: string
  image?: string
}
