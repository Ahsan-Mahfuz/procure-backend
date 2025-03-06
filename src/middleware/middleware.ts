import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from './middleware.interface'

export const bearerMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(401).json({ message: 'You are not authorized' })
      return
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' })
        return
      }

      if (typeof decoded !== 'object' || !decoded.id || !decoded.email) {
        res.status(403).json({ message: 'Invalid token format' })
        return
      }

      req.user = { id: decoded.id, email: decoded.email }
      next()
    })
  } catch (error) {
    next(error)
  }
}
