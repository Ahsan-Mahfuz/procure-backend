import express from 'express'
import { bearerMiddleware } from '../../../middleware/middleware'
import {
  getSuperAdminProfile,
  updateSuperAdminProfile,
} from './superAdminProfile.controller'
import upload from '../../../middleware/multer'

const superAdminProfileRouter = express.Router()

superAdminProfileRouter.get(
  '/super-admin-get-profile-settings',
  bearerMiddleware,
  getSuperAdminProfile
)
superAdminProfileRouter.patch(
  '/super-admin-patch-profile-settings',
  bearerMiddleware,
  upload.single('profileImage'),
  updateSuperAdminProfile
)

export default superAdminProfileRouter
