const mongoose = require('mongoose')

// Suppress deprecation warning
mongoose.set('strictQuery', true)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected at ${conn.connection.host}`.blue.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline)
    process.exit(1)
  }
}

module.exports = connectDB
