import express from 'express'
import { bearerMiddleware } from '../../middleware/middleware'
import {
  getProfileSettings,
  updateProfileSettings,
} from './profileSettings.controller'
import upload from '../../middleware/multer'

const profileSettingsRouter = express.Router()

profileSettingsRouter.get(
  '/get-profile-settings',
  bearerMiddleware,
  getProfileSettings
)
profileSettingsRouter.patch(
  '/patch-profile-settings',
  bearerMiddleware,
  upload.single('profileImage'),
  updateProfileSettings
)

export default profileSettingsRouter
