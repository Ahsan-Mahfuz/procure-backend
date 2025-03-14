import { Request, Response } from 'express'
import TermsAndConditions from './termsAndConditions.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import Auth from '../auth/superAdmin/auth.model'

export const postTermsAndConditions = async (
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

    const { termsAndConditions } = req.body

    const existingTerms = await TermsAndConditions.findOne({})

    if (existingTerms) {
      existingTerms.termsAndConditions = termsAndConditions
      await existingTerms.save()
      res.status(200).json({
        message: 'Terms and conditions updated successfully',
        termsAndConditions: existingTerms,
      })
      return
    }

    const newTerms = await TermsAndConditions.create({ termsAndConditions })
    res.status(201).json({
      message: 'Terms and conditions created successfully',
      termsAndConditions: newTerms,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating terms and conditions', error })
  }
}

export const getTermsAndConditions = async (_req: Request, res: Response) => {
  try {
    const termsAndConditionsValue = await TermsAndConditions.find({})
    res.status(200).json(termsAndConditionsValue)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error getting terms and conditions ', error })
  }
}
