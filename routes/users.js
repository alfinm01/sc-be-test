const express = require('express')
const router = express.Router()
const role = require('../config.json').role
const userService = require('../services/users')
const authorize = require('../services/auth').authorize()

router.get('/', authorize, getAllUsers)
router.get('/:id', authorize, getUserById)
router.post('/', authorize, createUser)
router.put('/:id', authorize, updateUserById)
router.delete('/:id', authorize, deleteUserById)

async function getAllUsers (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const users = await userService.getAll()
  return res.json(users)
}

async function getUserById (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
  const user = await userService.getById(req.params.id)
  return res.json(user)
}

async function createUser (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const user = await userService.create(req.body)
  return res.json(user)
}

async function updateUserById (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const user = await userService.updateById(req.params.id, req.body)
  return res.json(user)
}

async function deleteUserById (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const user = await userService.deleteById(req.params.id)
  if (!user) {
    return res.json({ message: 'User successfully deleted' })
  }
  return res.json(user)
}

module.exports = router
