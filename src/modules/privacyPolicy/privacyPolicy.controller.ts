import { Request, Response } from 'express'
import PrivacyPolicy from './privacyPolicy.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import Auth from '../auth/superAdmin/auth.model'

export const postPrivacyPolicy = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.email) {
      const user = await Auth.findOne({ email: req.user.email })
      if (!user) {
        res
          .status(404)
          .json({ message: 'You are not authorized to perform this action' })
        return
      }
    }
    const { privacyPolicy } = req.body

    const existingPrivacyPolicy = await PrivacyPolicy.findOne({})

    if (existingPrivacyPolicy) {
      existingPrivacyPolicy.privacyPolicy = privacyPolicy
      await existingPrivacyPolicy.save()
      res.status(200).json({
        message: 'Privacy policy updated successfully',
        termsAndConditions: existingPrivacyPolicy,
      })
      return
    }

    const newTerms = await PrivacyPolicy.create({ privacyPolicy })
    res.status(201).json({
      message: 'Privacy policy created successfully',
      termsAndConditions: newTerms,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error creating privacy policy', error })
  }
}

export const getPrivacyPolicy = async (_req: Request, res: Response) => {
  try {
    const termsAndConditionsValue = await PrivacyPolicy.find({})
    res.status(200).json(termsAndConditionsValue)
  } catch (error) {
    res.status(500).json({ message: 'Error getting privacy policy', error })
  }
}
