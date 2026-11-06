import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import Debug from 'debug';
import { fileURLToPath } from 'node:url';

// Importando la configuración de winston logger
import indexRouter from '#routes/index.js';
import usersRouter from '#routes/users.js';
import logger from './lib/winston.js';

// Importando el template engine de Handlebars y la configuración
import configureHandlebars from './lib/handlebars.js';

// Import de dependencias relativas del proyecto (con alias)

// Inicializa debug con el namespace deseado
const debug = Debug('dwssr-2026b:app');

// Creando las variables para __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mensaje de log al inicializar
logger.debug("🪓 Creando backend");

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register Helper de Handlebars
configureHandlebars(app);

// Archivos estáticos de Producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configuración de middlewares
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurar la carpeta de archivos estáticos
logger.debug("💾 Configurando carpeta de archivos estaticos");
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando rutas 
logger.debug("🛣️ Registrando rutas");
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, _next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;