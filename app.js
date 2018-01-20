'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config')
const indexRoutes = require('./routes/index')
const budgetRoutes = require('./routes/budget/budget')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const PORT = process.env.PORT || config.port
const DATABASE = process.env.DATABASEURL || config.database

mongoose.Promise = global.Promise
mongoose.connect(DATABASE)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')

app.use(require('express-session')({
	secret: 's3cr3t',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
	res.locals.user = req.user
	next()
})

app.use(indexRoutes)
app.use(budgetRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${config.port}`)
})