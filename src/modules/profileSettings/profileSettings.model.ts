import mongoose from 'mongoose'
import { IProfileSettings } from './profileSettings.interface'

const profileSettingsSchema = new mongoose.Schema<IProfileSettings>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const profileSettings = mongoose.model<IProfileSettings>(
  'ProfileSettings',
  profileSettingsSchema
)
export default profileSettings
