import mongoose from 'mongoose'

export interface IProfileSettings {
  userId: mongoose.Types.ObjectId
  name: {
    firstName: string
    lastName?: string
  }
  profileImage?: string
}
