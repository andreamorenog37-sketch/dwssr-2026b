//importando el core de winston
import winston, {format} from "winston"
import path from "node:path"
import fs from "node:fs"

import DailyRotateFile from "winston-daily-rotate-file"

//Desestructurar funciones utiles de format (se añadió 'label')
const { combine, timestamp, printf, colorize, prettyPrint, label } = format;

//Creando variable del directorio raiz 
const rootDir = path.resolve(process.cwd());

//Creando directorio de logs
const logsDir = path.join(rootDir, "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

//Definiendo el esquema de colores
const colors = { 
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
}

//Agregando esquema a winston
winston.addColors(colors);

//Creando formato de log para la consola
const myConsoleLogFormat = combine(
  //Colores del formato
  colorize({all: true}),
  //Agregando etiqueta
  label({label: "MyApp 😘"}),
  //Agregando fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  //Funcion de impresion corregida con callback
  printf((info) => `${info.level} > ${info.label} > ${info.timestamp} > ${info.message}`)
); // <-- Se añadió el paréntesis y la coma de cierre aquí

//Formato para los archivos JSON
const myFileFormat = combine(
  //Retirar colorizacion
  format.uncolorize(),
  //Agregando fecha ISO
  timestamp(),
  //Salida
  format.json()
);

//Construyendo y configurando transportes de winston
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(rootDir, `logs`, 'error.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 5, // Mantener un máximo de 5 archivos de log rotados
    format: myFileFormat
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleLogFormat
  },
  readableFile: {
    level: 'info',
    filename: path.join(logsDir, 'readable.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine (
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint()
    )
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: 5242880, // 5MB
    maxFiles: 2,
    format: myFileFormat
  }
};

//Creando el logger principal
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.errorFile),
    new winston.transports.File(options.readableFile),
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transports.Console(options.console)
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log')
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log')
    })
  ],
  exitOnError: false,
});

//Exportamos el logger principal
export default logger;