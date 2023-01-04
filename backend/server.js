const dotenv = require('dotenv').config()
const colors = require('colors')
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorMiddleware')

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/items', require('./routes/itemRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
