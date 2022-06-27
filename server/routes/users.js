var express = require('express');
const { body, param, validationResult } = require('express-validator');
const UserModel = require('../models/user');
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
  validate('registerUser'),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, firebaseId, name } = req.body;
      const users = await UserModel.find({ firebaseId });

      if (users.length) {
        return res.status(200).send({ message: "user already exists" });
      }

      await UserModel.create({ email, firebaseId, name });

      return res.status(201).send({ message: "user created" })
    } catch (err) {
      return next(err);
    }
  }
);

router.get('/',
  async function (req, res, next) {
    try {
      const user = req.user;
      return res.status(200).send({ user });
    } catch (err) {
      return next(err);
    }
  }
);

router.put('/', validate('updateUser'), async function (req, res, next) { });


module.exports = router;
