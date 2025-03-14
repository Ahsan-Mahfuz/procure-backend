import { Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import VendorAndNormalAuth from '../auth/vendorAndNormalAuth/vendorAndNormalAuth.model'
import BusinessProfile from './businessProfile.model'

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/business-profiles'

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  },
})

// Configure multer upload
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})

// Multer middleware for handling multiple file uploads
const uploadFields = upload.fields([
  { name: 'logoImage', maxCount: 1 },
  { name: 'serviceImage', maxCount: 1 },
])

// Create or update business profile with file uploads
export const createBusinessProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  uploadFields(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: `Upload error: ${err.message}` })
    }

    try {
      if (req.user?.email) {
        const user = await VendorAndNormalAuth.findOne({
          email: req.user.email,
        })
        if (!user || user.role !== 'VENDOR') {
          res
            .status(404)
            .json({ message: 'You are not authorized to perform this action' })
          return
        }
      }

      const {
        userName,
        businessPhoneNumber,
        yearBusinessStarted,
        noOfEmployees,
        vatNumber,
        registrationOrIDNumber,
        businessName,
        selectServices,
        serviceCategories,
        description,
        area,
        building,
        streetAddress,
        postalCode,
        serviceRadius,
        city,
      } = req.body

      // Get uploaded file paths
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

      const logoImagePath =
        files && files.logoImage ? files.logoImage[0].path : null
      const serviceImagePath =
        files && files.serviceImage ? files.serviceImage[0].path : null

      // Find existing profile or create new one
      let businessProfile = await BusinessProfile.findOne({
        userName: req.user?.email, // Using email as username for lookup
      })

      if (businessProfile) {
        // Handle logo image update
        if (logoImagePath && businessProfile.logoImage) {
          const oldLogoPath = path.resolve(businessProfile.logoImage)
          if (fs.existsSync(oldLogoPath)) {
            fs.unlinkSync(oldLogoPath)
          }
        }

        // Handle service image update
        if (serviceImagePath && businessProfile.serviceImage) {
          const oldServicePath = path.resolve(businessProfile.serviceImage)
          if (fs.existsSync(oldServicePath)) {
            fs.unlinkSync(oldServicePath)
          }
        }

        // Update profile with new data
        Object.assign(businessProfile, {
          userName,
          businessPhoneNumber,
          yearBusinessStarted,
          noOfEmployees,
          vatNumber,
          registrationOrIDNumber,
          businessName,
          selectServices,
          serviceCategories,
          description,
          area,
          building,
          streetAddress,
          postalCode,
          serviceRadius,
          city,
          logoImage: logoImagePath || businessProfile.logoImage,
          serviceImage: serviceImagePath || businessProfile.serviceImage,
        })

        await businessProfile.save()

        res.status(200).json({
          message: 'Business profile updated successfully',
          businessProfile,
        })
        return
      } else {
        // Create new profile
        businessProfile = await BusinessProfile.create({
          userName,
          businessPhoneNumber,
          yearBusinessStarted,
          noOfEmployees,
          vatNumber,
          registrationOrIDNumber,
          businessName,
          selectServices,
          serviceCategories,
          description,
          area,
          building,
          streetAddress,
          postalCode,
          serviceRadius,
          city,
          logoImage: logoImagePath,
          serviceImage: serviceImagePath,
        })

        res.status(201).json({
          message: 'Business profile created successfully',
          businessProfile,
        })
        return
      }
    } catch (error) {
      // Remove uploaded files if there was an error
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[]
        }

        if (files.logoImage) {
          fs.unlinkSync(files.logoImage[0].path)
        }

        if (files.serviceImage) {
          fs.unlinkSync(files.serviceImage[0].path)
        }
      }

      res
        .status(500)
        .json({ message: 'Error processing business profile', error })
    }
  })
}

// export const updateBusinessProfile = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const updatedProfile = await BusinessProfile.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     )
//     if (!updatedProfile) {
//       res.status(404).json({ message: 'Business profile not found' })
//       return
//     }
//     res.status(200).json(updatedProfile)
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating business profile', error })
//   }
// }

// export const deleteBusinessProfile = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const deletedProfile = await BusinessProfile.findByIdAndDelete(id)
//     if (!deletedProfile) {
//       res.status(404).json({ message: 'Business profile not found' })
//       return
//     }
//     res.status(200).json({ message: 'Business profile deleted successfully' })
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting business profile', error })
//   }
// }

// export const getAllBusinessProfiles = async (req: Request, res: Response) => {
//   try {
//     const businessProfiles = await BusinessProfile.find({})
//     res.status(200).json(businessProfiles)
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Error retrieving business profiles', error })
//   }
// }
