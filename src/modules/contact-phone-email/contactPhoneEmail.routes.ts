import express from 'express'
import { bearerMiddleware } from '../../middleware/middleware'
import {
  getContactPhoneEmail,
  postContactPhoneEmail,
  updateContactPhoneEmail,
} from './contactPhoneEmail.controller'

const contactPhoneEmailRouter = express.Router()

contactPhoneEmailRouter.get(
  '/get-all-contact-us-phone-email',
  getContactPhoneEmail
)
contactPhoneEmailRouter.post(
  '/post-contact-us-phone-email',
  bearerMiddleware,
  postContactPhoneEmail
)
contactPhoneEmailRouter.patch(
  '/update-contact-us-phone-email/:id',
  bearerMiddleware,
  updateContactPhoneEmail
)

export default contactPhoneEmailRouter
