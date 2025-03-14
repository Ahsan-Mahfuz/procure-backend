import express from 'express'
import { getPrivacyPolicy, postPrivacyPolicy } from './privacyPolicy.controller'
import { bearerMiddleware } from '../../middleware/middleware'

const privacyPolicyRouter = express.Router()

privacyPolicyRouter.get('/get-privacy-policy', getPrivacyPolicy)
privacyPolicyRouter.post(
  '/post-privacy-policy',
  bearerMiddleware,
  postPrivacyPolicy
)

export default privacyPolicyRouter
