import { Request, Response } from 'express'
import profileSettings from './profileSettings.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import fs from 'fs'
import path from 'path'

export const updateProfileSettings = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'User ID is missing from token' })
      return
    }

    const { name } = req.body
    if (!name) {
      res.status(400).json({ message: 'Name is required' })
      return
    }

    const parsedName = JSON.parse(name)
    const { firstName, lastName } = parsedName

    if (!firstName) {
      res.status(400).json({ message: 'First name is required' })
      return
    }

    const profileImage = req.file ? req.file.path : null

    let userProfile = await profileSettings.findOne({ userId: req.user.id })

    if (userProfile) {
      if (profileImage && userProfile.profileImage) {
        const oldImagePath = path.resolve(userProfile.profileImage)

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
      userProfile.name = { firstName, lastName }
      if (profileImage) {
        userProfile.profileImage = profileImage
      }
      await userProfile.save()

      res.status(200).json({
        message: 'Profile settings updated successfully',
        userProfile,
      })
      return
    } else {
      userProfile = await profileSettings.create({
        userId: req.user.id,
        name: { firstName, lastName },
        profileImage,
      })
      res.status(201).json({
        message: 'Profile settings created successfully',
        userProfile,
      })
      return
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile settings', error })
    return
  }
}

export const getProfileSettings = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'User ID is missing from token' })
      return
    }
    const userProfile = await profileSettings.findOne({ userId: req.user.id })
    if (!userProfile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }
    res.status(200).json(userProfile)
    return
  } catch (error) {
    res.status(500).json({ message: 'Error getting profile  ', error })
    return
  }
}
