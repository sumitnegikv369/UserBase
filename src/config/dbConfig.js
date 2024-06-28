import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb://127.0.0.1:27017/userBase`,
    )
    console.log(
      `\n MONGODB CONNECTED || DB HOST: ${connectionInstance.connection.host}`,
    )
  } catch (error) {
    console.error('MONGODB connection error: ', error)
    process.exit(1)
  }
}

export default connectDB
