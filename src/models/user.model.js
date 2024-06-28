import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot be more than 50 characters long'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  profile: {
    firstName: {
      type: String,
      minlength: [3, 'First name must be at least 3 characters long'],
      maxlength: [50, 'First name cannot be more than 50 characters long'],
    },
    lastName: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'],
      maxlength: [50, 'Last name cannot be more than 50 characters long'],
    },
    bio: {
      type: String,
      maxlength: [200, 'Bio cannot be more than 200 characters long'],
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be less than 0'],
      max: [120, 'Age cannot be more than 120'],
      validate: {
        validator: Number.isInteger,
        message: 'Age must be an integer',
      },
    },
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('users', userSchema)

export default User
