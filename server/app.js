//funcion para mejerar errores en la aplicación
import createError from 'http-errors';

//importar framework express
import express from 'express';

//importar modulos para manejar rutas 
import path from 'node:path';

//importar modulos para manejar cookies
import cookieParser from 'cookie-parser'

//importar modulos para manejar logs
import logger from 'morgan'
 //importanto biblioteca de debug
 import createDebug from 'debug' //🎉
//imports para crear dirname
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path';
//creacion del objeto debug
const debug = createDebug('dwssr-2026b:server');//🎉

//creando las variables
const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var app = express();

//importar las rutas de la aplicacion
import indexRouter from '#routes/index.js'; //forma con alias
import usersRouter from '#routes/users.js'; //forma con alias


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..','public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
