import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHbsEngine } from 'express-handlebars';

import { registerViteHelper } from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//esportar la funcion de configuracipo
export default function configureHandlebars(app) {
  //establecioendo la extencion de los archivos donde las vistas  .hbs
  //estableciendo el layout princiapl en el main
  const exphbs = createHbsEngine({
    estname: '.hbs',
    defaultLayout: 'main',
  });

  //registrando el helper de vite
  registerViteHelper(exphbs.handlebars);

  //registrando handelbars en la app de espress
  //registo de engine y su nombre
  app.engine('hbs', exphbs.engine);
  //registrando el engine previamente registrado
  app.set('view engine', 'hbs');
  //estableciendo el directorio de vistas
  app.set('views', path.join(__dirname, '..', 'views'));
}