import express from 'express';
import getUsers from './users.controller.js';

//Creando un enrutador de express
const usersRouter = express.Router();

//Enrutamiento de GET "/users"
usersRouter.get("/", getUsers);

export default usersRouter;