
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/Helper')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ extended: false }))

// Connect to the database
connectDB()

// Define API routes using Express Router
const usersRoute = require('./routes/crud/User')
const movieRoute = require('./routes/crud/Movie')
const protectedrRoute = require('./routes/crud/User')


app.use('/api/user', usersRoute)
app.use('/api/protected-route', protectedrRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))