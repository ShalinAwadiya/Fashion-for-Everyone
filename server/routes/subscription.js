var express = require('express');
const { subscribeUser } = require('../controllers/subscriptionController');
var router = express.Router();

router.post('/subscription', subscribeUser);

module.exports = router;