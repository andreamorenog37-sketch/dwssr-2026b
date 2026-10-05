// biblioteca file stream
import fs from 'node:fs';
//biblioteca de rutas 
import path from 'node:path';


import { fileURLToPath } from 'node:url'

//creando las variables de rutas 
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
 }
    
    
