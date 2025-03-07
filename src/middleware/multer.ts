// import multer from 'multer'
// import path from 'path'

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname)
//     cb(null, `${Date.now()}${ext}`)
//   },
// })

// const fileFilter = (
//   req: Express.Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   if (
//     file.mimetype.startsWith('image/') ||
//     file.mimetype === 'application/pdf'
//   ) {
//     cb(null, true)
//   } else {
//     cb(new Error('Only image or PDF files are allowed!'))
//   }
// }

// const upload = multer({ storage, fileFilter })

// export default upload

import multer from 'multer'
import path from 'path'
import { Request, Response } from 'express'


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`) 
  },
})

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === 'image') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed in the image section!'))
    }
  } else if (file.fieldname === 'document') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed in the document section!'))
    }
  } else {
    cb(new Error('Unexpected field'))
  }
}

const upload = multer({
  storage,
  fileFilter,
})

export default upload
