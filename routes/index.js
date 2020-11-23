var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req,res)=>{
  res.json({Greetings: "Hello world"}).status(200)
});

module.exports = router;
