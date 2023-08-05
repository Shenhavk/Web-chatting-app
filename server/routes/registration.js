const registrationController = require('../controllers/registration');

const express = require('express');
var router = express.Router();

router.route('/').post(registrationController.createUser);
router.route('/:id').get(registrationController.searchUser, registrationController.index);

module.exports = router;