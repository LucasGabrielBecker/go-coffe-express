var express = require('express');
var router = express.Router();
const goController = require('../controllers/go.controller')

/* GET home page. */
router.get('/', (req,res)=>{
  res.json({Gos: "Gos endpoints"}).status(200)
});
router.post('/create',goController.create)
router.get('/listGos', goController.getAllgos)
router.get('/:id', goController.getGoById)
router.delete('/delete/:id', goController.deleteGoById)

module.exports = router;
