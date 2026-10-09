// biblioteca file stream
import fs from 'node:fs';
//Biblioteca de rutas
import path, { dirname } from 'node:path'


import { fileURLToPath } from 'node:url'


import{dirname} from 'node:path'

//Creando variables de rutas
const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/*
*Helper para handlebars qeu genera las etiquetas de vite 
*en desarrollo :conecta al servidore de desarrollo de vite
*en produccion: usa los complipados de vite 
*/
export function viteAssets() {
    //obtener modo de ejcucion 
    const isDev =cprocess.env.NODE_ENV !== 'production'
    //rescatando la url del servidor de desarrollo 
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'
    // si estamos en modo desarrollador 
    if(isDev){
        //en desarrollo ,cragamos los archivos 
        //del ront en directamente del servidor 
        //de desarrollo de vite
        return `
        <script type ="module" src ="${viteDevServer}@vite/client"></script>
        <script type ="module" src ="${viteDevServer}/main.js"></script>
        `;
    }
    //en produccion leemos el manifest 
    //y generamos las etiquetas finlaes de produccion 
    const manifestPath = path.join(__dirname,'..','..','dist','.vite','manifest.js');
   //Si no existe el manifest
    if (!fs.existsSync(manifestPath)){
        console.warn("Vite manifest not found. Run 'npm run build'")
        return '';
        
    }
    //Leyendo y parseando a JSON el archivo de manifiesto que 
//genera vite en la compilación de 
//los archivos del front-end
const manifest= JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
//Obteniendo la ruta del punto de entrada del front-end 
const mainEntry = manifest['main.js']
//Guarda el main.js
if(!mainEntry){
  console.warn('Archivo main.js no está disponible en el manifiesto de Vite')
  return ''
}

let tags = ''

//CSS files
if(mainEntry.css){
  mainEntry.css.forEach(cssFile => {
    tags += `<link rel="stylesheet" href="/${cssFile}">\n`
})

}

//JS files
tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;

return tags;
}
/*
Función registradora del helper de Handlebars 
*/ 
export function registerViteHelper(hbs){
  hbs.registerHelper('viteAssets', ()=>{
    //Sanitizando la salida del helper
    return new hbs.SafeString(viteAssets());
  });
}
 
    
    
