import { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import VendorAndNormalAuth from './vendorAndNormalAuth.model'


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }
    if (await VendorAndNormalAuth.findOne({ email })) {
      res.status(400).json({ message: 'User already exists' })
      return
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await VendorAndNormalAuth.create({
      email,
      password: hashedPassword,
    })

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }
    const user = await VendorAndNormalAuth.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '20d' }
    )
    res.status(200).json({ message: 'User logged in successfully', token })
  } catch (error) {
    res.status(500).json({ message: 'Error login user', error })
  }
}
