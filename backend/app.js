const express = require('express')
const app = express()
const cors = require('cors')
const filesRouter = require('./routes/files')

// Server setup
app.use(cors())
app.use(express.json())

// Setup routes
app.use('/files', filesRouter)

module.exports = app