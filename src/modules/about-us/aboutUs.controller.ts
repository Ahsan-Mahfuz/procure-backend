import { Request, Response } from 'express'
import { AboutUs } from './aboutUs.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import Auth from '../auth/superAdmin/auth.model'
import path from 'path'
import fs from 'fs'

export const postAboutUs = async (req: AuthenticatedRequest, res: Response) => {
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
    const { aboutUs } = req.body
    const aboutUsImage =
      req.files && (req.files as any).image
        ? (req.files as any).image[0].path
        : null

    let aboutUsFind = await AboutUs.findOne()

    if (aboutUsFind) {
      if (aboutUsImage && aboutUsImage.image) {
        const oldImagePath = path.resolve(aboutUsImage.image)

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      Object.assign(aboutUsFind, {
        image: aboutUsImage || aboutUsFind.image,
        aboutUs,
      })

      await aboutUsFind.save()

      res.status(200).json({
        message: 'About us updated successfully',
        aboutUsFind,
      })
      return
    } else {
      aboutUsFind = await AboutUs.create({
        image: aboutUsImage,
        aboutUs,
      })
      res.status(201).json({
        message: 'About us created successfully',
        aboutUsFind,
      })
      return
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating about us', error })
  }
}

export const getAboutUs = async (_req: Request, res: Response) => {
  try {
    const aboutUsValue = await AboutUs.find()
    res.status(200).json(aboutUsValue)
  } catch (error) {
    res.status(500).json({ message: 'Error getting about us', error })
  }
}
