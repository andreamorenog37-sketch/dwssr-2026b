import express from 'express';
import logger from '../lib/winston.js';

const indexRouter = express.Router();

let counter = 0;
const numbers = []
/* GET home page. */
indexRouter.get('/', (req, res, _next) => { 
  counter += 1;
  numbers.push(counter);
  res.render('index', { 
    title: 'EL MAS TUTSI PINK: ANDREA GARCIA MORENO',
    counter,
    numbers,
  });
});
//Rutas para prueba de logs
//Acceder aFET /test-logs
indexRouter.get('/test-logs', (req, res, _next) => {
  logger.info('Mensaje de log de prueba INFO');
  logger.warn('Mensaje de log de prueba WARN');
  logger.error('Mensaje de log de prueba ERROR');
  res.json ({ message: 'Logs de prueba generados. Revisa los archivos de log.',
    files: [
      'logs/error.log',
      'logs/readable.log',
      'logs/app-YYYY-MM-DD.log'
    ]
  }) });

  // Rutas para pruebas exceptions y rejections
  if (process.env.NODE_ENV !== "production") {
    //Ruta prueba exception
    indexRouter.get("/test-exception", (req, res, _next) => {
    res.json({ message: "Generando excepción de prueba..." })
    setTimeout(() => {
      throw new Error("Excepción de prueba lanzada después de 5 segundos");
    },100)
  })
  //Ruta prueba rejection
  indexRouter.get('/test-rejection', (req, res, _next) => {
    res.json({ message: "Generando rejection de prueba..." });
//Promesa rechazada sin catch
  Promise.reject(new Error('Rejection de prueba lanzada después de 5 segundos'));
  });  
}
//module.exports = indexRouter;
export default indexRouter;