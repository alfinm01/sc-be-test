const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send({ message: err.message })
})

module.exports = app
