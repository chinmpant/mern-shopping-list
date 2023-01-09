const dotenv = require('dotenv').config()
const colors = require('colors')
const path = require('path')
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorMiddleware')

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/items', require('./routes/itemRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  })
} else {
  app.get('/', (req, res) => res.send('Please set `NODE_ENV` to production'))
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
