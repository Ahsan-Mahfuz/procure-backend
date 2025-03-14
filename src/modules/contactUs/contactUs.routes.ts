import express from 'express'
import { bearerMiddleware } from '../../middleware/middleware'
import { getContactUs, postContactUs } from './contactUs.controller'

const contactUsRouter = express.Router()

contactUsRouter.get('/get-all-contact-us', bearerMiddleware, getContactUs)
contactUsRouter.post('/post-contact-us', postContactUs)

export default contactUsRouter
