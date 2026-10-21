import express from 'express'; 
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, _next) {
  res.send('lista de usuarios');
});

export default router;