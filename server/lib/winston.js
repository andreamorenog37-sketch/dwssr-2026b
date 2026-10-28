// Importando el core de winston
import winston, { format } from "winston";
import path from "node:path";
import fs from "node:fs";

import DailyRotateFile from "winston-daily-rotate-file";

// Desestructurar funciones útiles de format (agregado 'label')
const { combine, timestamp, printf, colorize, label } = format;

// Creando variable del directorio raíz 
const rootDir = path.resolve(process.cwd());

// Creando directorio de logs
const logsDir = path.join(rootDir, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Definiendo el esquema de colores
const colors = { 
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

// Agregando esquema a winston
winston.addColors(colors);

const myConsoleFormat = combine( 
  // COLORES DEL FORMATO 
  colorize({ all: true }),
  // Agregando una etiqueta
  label({ label: '📢' }),
  // Agregando fecha
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  // Función de impresión (corregido con backticks)
  printf((info) => `${info.level} z ${info.label} > ${info.timestamp} ▶ ${info.message}`)
);

// Formato para los archivos JSON
const myFileFormat = combine(
  // Retirar colorización
  format.uncolorize(),
  // Agregar fecha ISO
  timestamp(),
  // Salida
  format.json()
);

// Construyendo configuración de opciones/transportes
const options = {
  errorFile: {
    level: "error",
    filename: path.join(logsDir, "error-%DATE%.log"),
    maxsize: 5242880, // 5MB 
    format :myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat
  },
  readableFile: {
     level: 'info',
    filename: path.join(logsDir, 'readable.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint(),
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: 5242880, // 5MB
    maxFiles: 2,
    format: myFileFormat
  },
};
//creando el logger
const logger = winston.createLogger({
    transports: [ 
        new DailyRotateFile(options.dailyRotateFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.File(options.readableFile),
        new winston.transports.Console(options.console)
    ],
    exitonHandlers: [
        new winston.transports.File({
            filename: path.join(logsDir, 'exceptions.log'),
        }),
    ],
    exitonHandlers: [
        new winston.transports.File({
            filename: path.join(logsDir, 'rejections.log'),
        }),
    ],
});
    //exportamos el logger 
    export default logger;
  