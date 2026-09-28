import express from 'express';  
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('lista de usuarios');
});

//module.exports = router;
 export default router;
