var express = require('express');
const { body } = require('express-validator');
const { registerUser, getUser } = require('../controllers/userController');
var router = express.Router();

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
      return []
    }
  }
}

/* http methods */
router.post('/',
  validate('registerUser'), registerUser
);

router.get('/', getUser);

router.put('/', validate('updateUser'), async function (req, res, next) { });


module.exports = router;
