var express = require('express');
var router = express.Router();
const authorize = require('../services/auth').authorize();
const userService = require('../services/users');

router.get('/', authorize, getAllUsers);
// router.get('/:id', authorize, getUserById);
// router.post('/', authorize, createUser);
// router.put('/:id', authorize, updateUserById);
// router.delete('/:id', authorize, deleteUserById);

async function getAllUsers(req, res, next) {
  const users = await userService.getAll();
  return res.json(users);
}

// function getUserById(req, res, next) {

// }

// function createUser(req, res, next) {

// }

// function updateUserById(req, res, next) {

// }

// function deleteUserById(req, res, next) {

// }

module.exports = router;
