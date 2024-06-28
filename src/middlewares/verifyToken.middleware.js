import asyncHandler from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'

const verifyToken = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token.' })
  }
})

export default verifyToken
