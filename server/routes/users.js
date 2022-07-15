/**
 * Author: Deep Adeshra (dp974154@dal.ca)
 *
 * */
var express = require('express');
const { body } = require('express-validator');
const { registerUser, getUser, updateUser } = require('../controllers/userController');
var router = express.Router();

// Validates resquest body for registerUser and updateUser controller
const validate = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        body('email').exists().isEmail(),
        body('firebaseId').exists().isString(),
        body('name').exists().isString()
      ]
    }
    case 'updateUser': {
      return [
        body('email').isEmail(),
        body('name').isString()
      ]
    }
  }
}

/* http methods */
router.post('/', validate('registerUser'), registerUser);
router.get('/', getUser);
router.put('/', validate('updateUser'), updateUser);

module.exports = router;
