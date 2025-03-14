import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from './category.controller'
import { bearerMiddleware } from '../../middleware/middleware'

const categoryRouter = express.Router()

categoryRouter.post('/create-category', bearerMiddleware, createCategory)
categoryRouter.get('/get-all-category', getCategories)
categoryRouter.patch('/update-category/:id', bearerMiddleware, updateCategory)
categoryRouter.delete('/delete-category/:id', bearerMiddleware, deleteCategory)

export default categoryRouter
