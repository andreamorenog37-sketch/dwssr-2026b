import express from 'express'; 
const router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/', function(req, res, _next) {
  counter++;
  res.render('index', { counter: counter });
});

export default router;