import mongoose from 'mongoose'
import { IContactUs } from './contactUs.interface'

const contactUsSchema = new mongoose.Schema<IContactUs>(
  {
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
    opinions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const ContactUs = mongoose.model('ContactUs', contactUsSchema)
export default ContactUs
