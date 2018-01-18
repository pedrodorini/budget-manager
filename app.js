'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config')
const indexRoutes = require('./routes/index')

mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')
app.use(indexRoutes)

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})