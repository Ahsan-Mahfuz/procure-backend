import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import Auth from '../auth/superAdmin/auth.model'
import { ContactPhoneEmail } from './contactPhoneEmail.model'

export const postContactPhoneEmail = async (
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
    const { phone, email } = req.body

    const contactPhoneEmail = await ContactPhoneEmail.create({
      phone,
      email,
    })

    if (!contactPhoneEmail) {
      res.status(400).json({ message: 'Error creating contact us' })
      return
    }

    res.status(201).json({ message: 'Contact us created successfully' })
    return
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact us', error })
    return
  }
}
export const updateContactPhoneEmail = async (
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

    const { id } = req.params
    const { phone, email } = req.body
    const contactPhoneEmail = await ContactPhoneEmail.findByIdAndUpdate(
      id,
      { phone, email },
      { new: true }
    )
    if (!contactPhoneEmail) {
      res.status(404).json({ message: 'Contact us not found' })
      return
    }
    res.status(200).json({ message: 'Contact us updated successfully' })
    return
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact us', error })
    return
  }
}
export const getContactPhoneEmail = async (
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

    const contactPhoneEmail = await ContactPhoneEmail.find({})
    if (!contactPhoneEmail) {
      res.status(404).json({ message: 'Contact us not found' })
      return
    }
    res.status(200).json(contactPhoneEmail)
    return
  } catch (error) {
    res.status(500).json({ message: 'Error getting contact us', error })
    return
  }
}
