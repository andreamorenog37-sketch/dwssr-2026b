import express from 'express'

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, _next) => {
    res.send('<h1 style="color:red">Listado de usuarios no deseados</h1>');
});


//module.exports = router;
export default usersRouter;