//Funcion para manejar errores en la pp
var createError = require('http-errors');
//Importa el framewrok express
var express = require('express');
//Importa modulos para manejar rutas 
var path = require('path');
//Importa modulos para manejar cookies
var cookieParser = require('cookie-parser');
//Importa modulos para manejar logs
var logger = require('morgan');

//Importa las rutas de la aplicacion 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Crea la aplicacion express
var app = express();

// Configura el motor de vistas y la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//configurar middlewares de la app 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Configura la carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

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

module.exports = app;
