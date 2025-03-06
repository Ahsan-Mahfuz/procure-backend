import express from 'express'
import { login, register } from './vendorAndNormalAuth.controller'

const vendorAndNormalAuthRouter = express.Router()

vendorAndNormalAuthRouter.post('/vendorOrNormalUser/register', register)
vendorAndNormalAuthRouter.post('/vendorOrNormalUser/login', login)

export default vendorAndNormalAuthRouter
