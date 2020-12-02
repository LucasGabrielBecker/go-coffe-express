var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', (req,res)=>{
  axios.get("http://localhost:8080/dataservice").then(apiRes => {
    
    res.json({msg: "Hitted data service", data : apiRes.data}).status(200)
  }).catch(err=>{
    res.json(err)
  })
});

module.exports = router;
