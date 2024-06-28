import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const userRegistration = asyncHandler(async (req, res) => {
  const { username, password, email, profile } = req.body
  const newUser = new User({
    username,
    password,
    email,
    profile,
  })

  const savedUser = await newUser.save()

  const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  return res.status(201).json({
    message: 'User registered successfully',
    username: savedUser.username,
    email: savedUser.email,
    token: token,
  })
})

export const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  res.status(200).json({
    message: 'Login successful',
    username: user.username,
    email: user.email,
    token: token,
  })
})

export const userProfile = asyncHandler(async (req, res) => {
  const userId = req.userId
  const user = await User.findOne({ _id: userId })
  if (user) {
    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: user.profile,
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }
})
