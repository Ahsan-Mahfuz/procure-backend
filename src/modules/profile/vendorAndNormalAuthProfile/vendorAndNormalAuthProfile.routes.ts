import express from 'express'
import { bearerMiddleware } from '../../../middleware/middleware'

import upload from '../../../middleware/multer'
import {
  getVendorAndNormalAuthProfile,
  updateVendorAndNormalAuthProfile,
} from './vendorAndNormalAuthProfile.controller'

const vendorAndNormalAuthProfileRouter = express.Router()

vendorAndNormalAuthProfileRouter.get(
  '/vendor-or-normal-auth-profile-get-profile-settings',
  bearerMiddleware,
  getVendorAndNormalAuthProfile
)
// vendorAndNormalAuthProfileRouter.patch(
//   '/vendor-or-normal-auth-profile-patch-profile-settings',
//   bearerMiddleware,
//   upload.single('profileImage'),
//   updateVendorAndNormalAuthProfile
// )

vendorAndNormalAuthProfileRouter.patch(
  '/vendor-or-normal-auth-profile-patch-profile-settings',
  bearerMiddleware,
  // upload.single('profileImage'),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  updateVendorAndNormalAuthProfile
)

export default vendorAndNormalAuthProfileRouter
