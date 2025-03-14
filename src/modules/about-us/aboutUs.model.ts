import mongoose from 'mongoose'
import { IAboutUs } from './aboutUs.interface'

const aboutUsSchema = new mongoose.Schema<IAboutUs>(
  {
    aboutUs: {
      type: String,
    },
    image: {
      type: String ,
    },
  },
  {
    timestamps: true,
  }
)
export const AboutUs = mongoose.model('AboutUs', aboutUsSchema)
export default AboutUs
