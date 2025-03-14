import express from 'express'
import { bearerMiddleware } from '../../middleware/middleware'
import {
  getTermsAndConditions,
  postTermsAndConditions,
} from './termsAndConditions.controller'

const termsAndConditionsRouter = express.Router()

termsAndConditionsRouter.get('/get-terms-and-conditions', getTermsAndConditions)
termsAndConditionsRouter.post(
  '/post-terms-and-conditions',
  bearerMiddleware,
  postTermsAndConditions
)

export default termsAndConditionsRouter
