import { Request, Response } from 'express'
import { Category } from './category.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import Auth from '../auth/superAdmin/auth.model'

// Create a new category
export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.email) {
      const user = await Auth.findOne({ email: req.user.email })
      if (!user) {
        res
          .status(404)
          .json({ message: 'You are not authorized to perform this action' })
        return
      }
    }

    const { categoryName, servicesName } = req.body

    if (!categoryName || !Array.isArray(servicesName)) {
      res.status(400).json({ message: 'Invalid input data' })
      return
    }

    let category = await Category.findOne({ categoryName })

    if (category) {
      res.status(400).json({ message: 'Category already exists' })
      return
    } else {
      category = await Category.create({
        categoryName,
        servicesName,
      })

      res
        .status(201)
        .json({ message: 'Category created successfully', category })
      return
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error })
    return
  }
}

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const skip = (page - 1) * limit

    const categories = await Category.find({}).skip(skip).limit(limit)

    if (categories.length === 0) {
      res.status(404).json({ message: 'No categories found' })
      return
    }

    const totalCategories = await Category.countDocuments({})

    res.status(200).json({
      categories,
      pagination: {
        page,
        limit,
        totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
      },
    })
    return
  } catch (error) {
    res.status(500).json({ message: 'Error getting categories', error })
    return
  }
}

// Update a category
export const updateCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.email) {
      const user = await Auth.findOne({ email: req.user.email })
      if (!user) {
        res
          .status(404)
          .json({ message: 'You are not authorized to perform this action' })
        return
      }
    }
    const { id } = req.params
    const { categoryName, servicesName } = req.body

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, servicesName },
      { new: true }
    )
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found' })
      return
    }
    res
      .status(200)
      .json({ message: 'Category updated successfully', updatedCategory })
    return
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error })
    return
  }
}

// // Delete a category
export const deleteCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params
    const deletedCategory = await Category.findByIdAndDelete(id)
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' })
      return
    }
    res.status(200).json({ message: 'Category deleted successfully' })
    return
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error })
    return
  }
}
