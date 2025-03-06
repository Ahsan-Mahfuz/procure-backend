import dotenv from 'dotenv'
import express from 'express'

import connectDB from './config/db'

// import termsAndConditionsRouter from './modules/termsAndConditions/termsAndConditions.routes'
// import profileSettingsRouter from './modules/profileSettings/profileSettings.routes'
import path from 'path'

import http from 'http'
import { initializeSocket } from './utils/socket'
import vendorAndNormalAuthRouter from './modules/auth/vendorAuth/vendorAndNormalAuth.routes'
import authRouter from './modules/auth/superAdmin/auth.routes'
import superAdminProfileRouter from './modules/profile/superAdminProfile/superAdminProfile.routes'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

const server = http.createServer(app)
initializeSocket(server)

app.use('/procure/auth', authRouter)
app.use('/procure/auth', vendorAndNormalAuthRouter)
app.use('/procure', superAdminProfileRouter)

// app.use('/procure', termsAndConditionsRouter)
// app.use('/procure', profileSettingsRouter)

connectDB()
const PORT: number = parseInt(process.env.PORT as string) || 5000
const HOST: string = process.env.HOST || '10.0.60.187'

server.listen(PORT, HOST, () =>
  console.log(`Server running on http://${HOST}:${PORT}`)
)
