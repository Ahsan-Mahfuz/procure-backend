import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../../middleware/middleware.interface'
import path from 'path'
import fs from 'fs'
import VendorAndNormalAuthProfile from './vendorAndNormalAuthProfile.model'

export const getVendorAndNormalAuthProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'User ID is missing from token' })
      return
    }
    const vendorAndNormalAuthProfile = await VendorAndNormalAuthProfile.findOne(
      {
        user: req.user.id,
      }
    )
    console.log(vendorAndNormalAuthProfile)
    if (!vendorAndNormalAuthProfile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }
    res.status(200).json(vendorAndNormalAuthProfile)
    return
  } catch (error) {
    res.status(500).json({ message: 'Error getting profile', error })
    return
  }
}


export const updateVendorAndNormalAuthProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'User ID is missing from token' })
      return
    }

    const { fullName, phoneNumber, area, building, postalCode, streetAddress } =
      req.body

    console.log('Uploaded files:', req.files)

    const profileImage =
      req.files && (req.files as any).image
        ? (req.files as any).image[0].path
        : null
    const documentFile =
      req.files && (req.files as any).document
        ? (req.files as any).document[0].path
        : null

    let userProfile = await VendorAndNormalAuthProfile.findOne({
      user: req.user.id,
    })

    if (userProfile) {
      if (profileImage && userProfile.image) {
        const oldImagePath = path.resolve(userProfile.image)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      if (documentFile && userProfile.document) {
        const oldDocumentPath = path.resolve(userProfile.document)
        if (fs.existsSync(oldDocumentPath)) {
          fs.unlinkSync(oldDocumentPath)
        }
      }

      Object.assign(userProfile, {
        fullName,
        phoneNumber,
        area,
        building,
        postalCode,
        streetAddress,
        image: profileImage || userProfile.image,
        document: documentFile || userProfile.document,
      })

      await userProfile.save()

      

      res.status(200).json({
        message: 'Profile settings updated successfully',
        userProfile,
      })
      return
    }

    userProfile = await VendorAndNormalAuthProfile.create({
      user: req.user.id,
      fullName,
      phoneNumber,
      area,
      building,
      postalCode,
      streetAddress,
      image: profileImage,
      document: documentFile,
    })

    res.status(201).json({
      message: 'Profile settings created successfully',
      userProfile,
    })
    return
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error })
    return
  }
}
