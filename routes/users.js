var express = require('express');
var router = express.Router();
const authorize = require('../services/auth').authorize();
const userService = require('../services/users');

router.get('/', authorize, getAllUsers);
router.get('/:id', authorize, getUserById);
router.post('/', authorize, createUser);
router.put('/:id', authorize, updateUserById);
router.delete('/:id', authorize, deleteUserById);

async function getAllUsers(req, res, next) {
  const users = await userService.getAll();
  return res.json(users);
}

async function getUserById(req, res, next) {
  const user = await userService.getById(req.params.id);
  return res.json(user);
}

async function createUser(req, res, next) {
  const user = await userService.create(req.body);
  return res.json(user);
}

async function updateUserById(req, res, next) {
  const user = await userService.updateById(req.params.id, req.body);
  return res.json(user);
}

async function deleteUserById(req, res, next) {
  const user = await userService.deleteById(req.params.id);
  return res.json(user);
}

module.exports = router;
