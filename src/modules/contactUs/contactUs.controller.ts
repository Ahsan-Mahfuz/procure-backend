import { Request, Response } from 'express'
import ContactUs from './contactUs.model'
import { AuthenticatedRequest } from '../../middleware/middleware.interface'
import Auth from '../auth/superAdmin/auth.model'

export const postContactUs = async (req: Request, res: Response) => {
  try {
    const { email, subject, opinions } = req.body

    const newTerms = await ContactUs.create({ email, subject, opinions })
    res.status(201).json({
      message: 'Message sent successfully',
      contactUs: newTerms,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error })
  }
}

export const getContactUs = async (
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
    const contactUsValue = await ContactUs.find({})
    res.status(200).json(contactUsValue)
  } catch (error) {
    res.status(500).json({ message: 'Error getting contact us', error })
  }
}

// export const postNumberWithEmailContactUs = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     if (req.user?.email) {
//       const user = await Auth.findOne({ email: req.user.email })
//       if (!user) {
//         res
//           .status(404)
//           .json({ message: 'You are not authorized to perform this action' })
//         return
//       }
//     }
//     const { number, email } = req.body
//     const updateNumber = await ContactUs.findOneAndUpdate(
//       { email: email },
//       { number: number },
//       { new: true }
//     )
//     res.status(200).json(updateNumber)
//   } catch (error) {}
// }
