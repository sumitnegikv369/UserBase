import express from 'express'
import {
  userLogin,
  userProfile,
  userRegistration,
} from '../controllers/user.controller.js'
import verifyToken from '../middlewares/verifyToken.middleware.js'

const router = express.Router()

router.post('/register', userRegistration)

router.post('/login', userLogin)

router.get('/profile', verifyToken, userProfile)

export default router
