var express = require('express');
var router = express.Router();

const UserController = require("../controllers/user.controller")

router.get('/', UserController.getAllUsers);
router.post('/create', UserController.create);


module.exports = router ;
