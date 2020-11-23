var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.controller')

/* GET home page. */
router.get('/', (req,res)=>{
  res.json({Greetings: "Hello authenticate routes"}).status(200)
});

router.post('/login', authController.login)

module.exports = router;
