// Modules
require('dotenv').config()
const express = require('express')

// Application
const app = express()
const PORT = process.env.PORT || 5001
const connectDB = require('./config/database')
const errorHandler = require('./middleware/errorHandler')
const routerTodo = require('./routes/todo')

// connect to database
connectDB()

// body-parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/', routerTodo)

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
   console.log(`App is running at http://localhost:${PORT}`)
})