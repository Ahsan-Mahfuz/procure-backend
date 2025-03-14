import express from 'express'
import { bearerMiddleware } from '../../middleware/middleware'
import { getAboutUs, postAboutUs } from './aboutUs.controller'
import upload from '../../middleware/multer'

const aboutUsRouter = express.Router()

aboutUsRouter.get('/get-about-us', getAboutUs)
aboutUsRouter.post(
  '/post-about-us',
  bearerMiddleware,
  upload.fields([{ name: 'image', maxCount: 1 }]),
  postAboutUs
)

export default aboutUsRouter
