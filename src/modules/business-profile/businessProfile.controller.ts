import { Request, Response } from 'express'
import BusinessProfile from './businessProfile.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import VendorAndNormalAuth from '../auth/vendorAndNormalAuth/vendorAndNormalAuth.model'

export const createBusinessProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.email) {
      const user = await VendorAndNormalAuth.findOne({ email: req.user.email })
      if (!user || user.role !== 'vendor') {
        res
          .status(404)
          .json({ message: 'You are not authorized to perform this action' })
        return
      }
    }
    const businessProfile = new BusinessProfile(req.body)
    await businessProfile.save()
    res.status(201).json(businessProfile)
  } catch (error) {
    res.status(500).json({ message: 'Error creating business profile', error })
  }
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
