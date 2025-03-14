import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IContactPhoneEmail extends Document {
  email?: String
  phone?: String
}

const contactPhoneEmailSchema = new Schema<IContactPhoneEmail>(
  {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const ContactPhoneEmail: Model<IContactPhoneEmail> = mongoose.model(
  'ContactPhoneEmail',
  contactPhoneEmailSchema
)
