const config = require('../config.json')
const db = require('../_helpers/mongodb')

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const authorize = () => {
  return [
    expressJwt({ secret: config.secret, algorithms: ['HS256'], requestProperty: 'user' }),
    async (req, res, next) => {
      const user = await db.User.findById(req.user.id)
      if (!user || (user.role !== config.role.ADMIN && user.role !== config.role.USER)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      req.user.role = user.role
      const refreshTokens = await db.RefreshToken.find({ user: user.id })
      req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token)
      next()
    }
  ]
}

const authenticate = async (username, password) => {
  const user = await db.User.findOne({ username })
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return {
      error: 400,
      message: 'Username or password is incorrect'
    }
  }
  const jwtToken = generateJwtToken(user)
  const refreshToken = generateRefreshToken(user)
  await refreshToken.save()
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: refreshToken.token
  }
}

const refreshToken = async (token) => {
  const refreshToken = await getRefreshToken(token)
  const { user } = refreshToken
  const newRefreshToken = generateRefreshToken(user)
  refreshToken.replacedByToken = newRefreshToken.token
  await refreshToken.save()
  await newRefreshToken.save()
  const jwtToken = generateJwtToken(user)
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token
  }
}

async function getRefreshToken (token) {
  const refreshToken = await db.RefreshToken.findOne({ token }).populate('user')
  if (!refreshToken || !refreshToken.isActive) {
    return {
      error: 400,
      message: 'Invalid token'
    }
  };
  return refreshToken
}

function generateJwtToken (user) {
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '10m' })
}

function generateRefreshToken (user) {
  return new db.RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })
}

function randomTokenString () {
  return crypto.randomBytes(40).toString('hex')
}

function basicDetails (user) {
  const { id, name, email, username, role } = user
  return { id, name, email, username, role }
}

module.exports = {
  authorize,
  authenticate,
  refreshToken
}
