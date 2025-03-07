import { Request, Response } from 'express'
import SuperAdminProfile from './superAdminProfile.model'
import { AuthenticatedRequest } from '../../../middleware/middleware.interface'
import path from 'path'
import fs from 'fs'

export const getSuperAdminProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'User ID is missing from token' })
      return
    }
    const superAdminProfile = await SuperAdminProfile.findOne({
      superUser: req.user.id,
    })
    if (!superAdminProfile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }
    res.status(200).json(superAdminProfile)
    return
  } catch (error) {
    res.status(500).json({ message: 'Error getting profile', error })
    return
  }
}
export const updateSuperAdminProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'User ID is missing from token' })
      return
    }

    const { userName, contact, address } = req.body

    const profileImage =
      req.files && (req.files as any).image
        ? (req.files as any).image[0].path
        : null

    let userProfile = await SuperAdminProfile.findOne({
      superUser: req.user.id,
    })

    if (userProfile) {
      if (profileImage && userProfile.image) {
        const oldImagePath = path.resolve(userProfile.image)

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      Object.assign(userProfile, {
        userName,
        contact,
        address,
        image: profileImage || userProfile.image,
      })

      await userProfile.save()

      res.status(200).json({
        message: 'Profile settings updated successfully',
        userProfile,
      })
      return
    } else {
      userProfile = await SuperAdminProfile.create({
        superUser: req.user.id,
        userName,
        contact,
        address,
        profileImage,
      })
      res.status(201).json({
        message: 'Profile settings created successfully',
        userProfile,
      })
      return
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error })
    return
  }
}
