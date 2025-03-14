import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ICategory extends Document {
  categoryName: string
  servicesName: string[]
}

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    servicesName: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Category: Model<ICategory> = mongoose.model(
  'Category',
  categorySchema
)
